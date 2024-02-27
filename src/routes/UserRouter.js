const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')

router.get('/registration',(req,res) => {
    res.render('registration',{title: 'Registration Page'})
})
router.get('/login',(req,res) => {
    res.render('login',{title: 'Login Page'})
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
router.post('/registration',userController.registration)
router.post('/login',userController.login)

module.exports = router