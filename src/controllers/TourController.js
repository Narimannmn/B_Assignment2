const Tour = require("../models/Tour");

class  TourController{
    async create(req,res){
        try {   
            const newTour ={
                country: req.body.country || '',
                city: req.body.city || '',
                hotel: req.body.hotel || '',
                dateArrival: req.body.dateArrival || '',
                dateDeparture: req.body.dateDeparture || '',
                adults: req.body.adults || 0,
                children: req.body.children || 0,
                price: (req.body.adults || 0) * 100 + (req.body.children || 0) * 60,
                img1: req.body.img1 || '',
                img2: req.body.img2 || '',
                img3: req.body.img3 || '',

            };
            const savedTour = await Tour.create(newTour);
            res.redirect('/admin')
        } catch (error) {
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: 'Internal Server Error',
                text: 'Error adding tour:',
            });
        }
    }
    async getAll(req,res){
        const page = req.query.p || 1
        const limit = req.query.l || 3
	    let offset = (page - 1) * limit
		let query = {}
        const tours = await Tour.find(query).skip(offset).limit(limit)
        const totalCount = await Tour.countDocuments(query)
        const totalPages = Math.ceil(totalCount / limit)
		return {
            totalCount,
            totalPages,
            tours,
            currentPage: parseInt(page),
            limit: limit,
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;

            if (!id) {
                return res.status(400).render('error', {
                    title: '400 Bad Request',
                    type: '400 Bad Request',
                    text: 'Tour ID is required.',
                });
            }

            const tour = await Tour.findOne({_id: id});

            if (!tour) {
                return res.status(404).render('error', {
                    title: '404 Not Found',
                    type: '404 Not Found',
                    text: 'Tour not found.',
                });
            }

            return tour;

        } catch (error) {
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            });
        }
    }

    async Update(req,res){
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).render('error', {
                    title: '400 Tour ID is required',
                    type: 'Tour ID is required',
                    text: '',
                });
            }
            let updateData = req.body;

            // Check if `children` is an array and handle accordingly
            if (Array.isArray(updateData.children)) {
                updateData.children = updateData.children.map(Number).find(n => !isNaN(n));
            }

            const updatedTour = await Tour.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedTour) {
                return res.status(404).render('error', {
                    title: '404 Page not found',
                    type: 'Tour not found.',
                    text: '',
                });
            }
            res.redirect('/admin');

        } catch (error) {
            console.error(error);
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            });
        }
    }
    async Delete(req,res){
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).render('error', {
                    title: '404 Bad request',
                    type: 'Tour ID is required',
                    text: '',
                });
            }

            const deletedTour = await Tour.findByIdAndDelete(id);

            if (!deletedTour) {
                return res.status(404).render('error', {
                    title: '404 Page not found',
                    type: 'Tour not found.',
                    text: '',
                });
            }

            res.redirect('/admin');

        } catch (error) {
            res.status(500).render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            });
        }
    }

}

module.exports = new TourController()