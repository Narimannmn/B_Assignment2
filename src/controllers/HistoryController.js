const RequestHistory = require('../models/RequestHistory');
const User = require('../models/User')
const Tour = require('../models/Tour')
const mongoose = require('mongoose');

class HistoryController {
    async getToursByAction(req, res, action) {
        try {
            const userId = req.session.userId
            const query = { user: userId, action };
            const history = await RequestHistory.find(query).populate('tour');
            const tourIds = history.map(item => item.tour);
            const tours = await Tour.find({ _id: { $in: tourIds } })
            return tours
        } catch (error) {
            res.status(500)
            .render('error', {
                title: '500 Internal server error',
                type: 'Internal server error',
                text: '',
            });
        }
    }

    async getMyTour(req, res) {
        return await this.getToursByAction(req, res, 'added');
    }

    async getDeletedTours(req, res) {
        return await this.getToursByAction(req, res, 'deleted');
    }

    async getViewedTours(req, res) {
        return await this.getToursByAction(req, res, 'viewed');
    }

    async createViewedHistory(req, res,tourId) {
        const userId = req.session.userId;
        const historyDocument = await RequestHistory.create({
            action: "viewed",
            tour: new mongoose.Types.ObjectId(tourId),
            user: new mongoose.Types.ObjectId(userId)
        });
        if (userId) {
            const user = await User.findById(userId);
            if (user) {
                user.history.push(historyDocument._id);
                await user.save();
            } else {
                
                console.log("User not found.");
            }
        }
    }

    async updateAction(req, res,tourId,newAction) {
        try {
            const userId = req.session.userId;

            const historyEntry = await RequestHistory.findOne({
                user: userId,
                tour: new mongoose.Types.ObjectId(tourId),
            });

            if (!historyEntry) {
                return res.status(404).render('error', {
                    title: '404 History not found',
                    type: 'History entry not found',
                    text: '',
                });
            }

            historyEntry.action = newAction;
            await historyEntry.save();
        } catch (error) {
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            });
        }
    }

}

module.exports = new HistoryController();
