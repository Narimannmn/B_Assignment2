const Router = require('express')
const router = new Router()
const historyController = require('../controllers/HistoryController')

router.get('/mytours',async (req, res) => {
    try {
        const tours = await historyController.getMyTour(req, res);
        res.render('history', { tours, title: 'Added Tours', });
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            })
    }
})
router.get('/deleted',async (req, res) => {
    try {
        const tours = await historyController.getDeletedTours(req, res);
        res.render('history', { tours, title: 'Deleted tours' });
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            })
    }
})
router.get('/viewed',async (req, res) => {
    try {
        const tours = await historyController.getViewedTours(req, res);
        res.render('history', { tours, title: 'Viewed tours' });
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .render('error', {
                title: '500 Internal Server Error',
                type: '500 Server Error',
                text: 'Something went wrong.',
            })
    }
})
router.post('/viewed/:id',async (req, res) => {
    const { id } = req.params;
    await historyController.updateAction(req, res,id,'added');
    res.redirect('/history/mytours')
})
router.post('/mytours/:id',async (req, res) => {
    const { id } = req.params;
    await historyController.updateAction(req, res,id,'deleted');
    res.redirect('/history/mytours')
})

module.exports = router