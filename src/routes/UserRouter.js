const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')

router.get('/registration',(req,res) => {
    res.render('registration',{title: 'Registration Page'})
})
router.get('/login',(req,res) => {
    res.render('login',{title: 'Login Page'})
})
router.post('/registration',userController.registration)
router.post('/login',userController.login)

module.exports = router