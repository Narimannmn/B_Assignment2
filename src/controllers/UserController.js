const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const User = require('../models/User');
class UserController {
    async registration(req, res, next) {
        const { username, password,password2, role } = req.body;
        try {
            if (!username || !password || password2 !== password) {
                return  res.status(400)
                .render('error', {
                    title: '400 Wrong input',
                    type: ' Wrong input',
                    text: '',
                });
            }
            const candidate = await User.findOne({ username: username });
            if (candidate) {
                return  res.status(400)
                .render('error', {
                    title: '400 Wrong password or email',
                    type: ' Wrong input',
                    text: ' User with this email is already registered',
                });
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ username, role, password: hashPassword });
            res.redirect('/login')
        } catch (error) {
            return  res.status(500)
                .render('error', {
                    title: '500 Internal server error',
                    type: 'Internal server error',
                    text: '',
                });
        }
    }

    async login(req, res, next) {
        const {username, password} = req.body;
        try {
            const user = await User.findOne({username: username});
            if (!user) {
                return  res.status(400)
                .render('error', {
                    title: '400 Wrong password or email',
                    type: ' Wrong input',
                    text: ' Wrong password or email.',
                });
            }

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return  res.status(400)
                .render('error', {
                    title: '400 Wrong password or email',
                    type: ' Wrong input',
                    text: ' Wrong password or email.',
                });
            }
            req.session.userId = user._id
            req.session.role = user.role
            res.redirect('/')
        } catch (error) {
            res.status(500)
                .render('error', {
                    title: '500 Internal server error',
                    type: 'Internal server error',
                    text: '',
                });
        }
    }
}

module.exports = new UserController();
