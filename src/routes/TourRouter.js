const Router = require('express')
const router = new Router()
const tourController = require('../controllers/TourController')
const historyController = require('../controllers/HistoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const getWeather= require('../utils/getWeather')
router.get('/',async (req, res) => {
	try {
        const data = await tourController.getAll(req,res)
        data.title = "Travel"
        res.render('destinations', data )
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

router.get('/:id',checkRoleMiddleware('User'), async (req, res) => {
    try {
        const { id } = req.params;
        await historyController.createViewedHistory(req, res,id);
        const tour = await tourController.getOne(req, res);
        const weather = await getWeather(tour.city)
        console.log(weather)
        res.render('tour', { tour, title: 'Destinations',weather });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: '500 Internal Server Error',
            type: '500 Server Error',
            text: 'Something went wrong.',
        });
    }
});

router.post('/:id',checkRoleMiddleware('User'), async (req, res) =>{
    const { id } = req.params;
    await historyController.updateAction(req, res,id,'added');
})


module.exports = router