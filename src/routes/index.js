const Router = require('express')
const router = new Router()
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const destinationRouter = require('./TourRouter')
const userRouter = require('./UserRouter')
const historyRouter = require('./HistoryRouter')
const adminRouter = require('./AdminRouter')

router.use('/destination', destinationRouter);
router.use('/admin',checkRoleMiddleware('Admin'), adminRouter);
router.use(userRouter);
router.use('/history', checkRoleMiddleware('User'), historyRouter);

router.get('/', (req, res) => {
	res.render('index', { title: 'Main Page' })
})

// router.get('/api1', (req, res) => {
// 	res.render('api1', { title: 'Api teleport' })
// })

router.get("*", (req, res) => {
    res.status(404).render("error", {title: "404 Page Not Found", type: "404 Not Found", text: "The page you are looking for does not exist."});
});
module.exports = router