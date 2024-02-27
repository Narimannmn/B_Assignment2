const Router = require('express')
const router = new Router()
const tourController = require('../controllers/TourController')

router.get('', async (req, res) => {
    const data = await tourController.getAll(req,res)
    data.title = "Admin page"
    res.render('admin', data )
})
router.get('/:id', tourController.getOne)

router.post('/delete/:id', tourController.Delete)

router.post('', tourController.create)

router.post('/update/:id', tourController.Update);

router.delete('', tourController.Delete)

module.exports = router