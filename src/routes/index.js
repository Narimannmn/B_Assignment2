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
router.get('/about', (req, res) => {
    res.render('about',{title: "About Page"})
})
router.get('/contact', (req, res) => {
    res.render('contact',{title: "Contact Page"})
})
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});
router.get("*", (req, res) => {
    res.status(404).render("error", {title: "404 Page Not Found", type: "404 Not Found", text: "The page you are looking for does not exist."});
});
module.exports = router