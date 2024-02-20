const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const User = require('../models/User');
class UserController {
    async registration(req, res, next) {
        const { username, password,password2, role } = req.body;
        console.log(username, password,password2, role)
        try {
            if (!username || !password || password2 !== password) {
                return next(ApiError.badRequest('wrong inputs'));
            }
            const candidate = await User.findOne({ username: username });
            if (candidate) {
                return next(ApiError.badRequest('User with this username is already registered'));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ username, role, password: hashPassword });
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async login(req, res, next) {
        const {username, password} = req.body;
        try {
            const user = await User.findOne({username: username});
            if (!user) {
                return next(ApiError.internal('User not found'));
            }

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return next(ApiError.internal('Wrong password'));
            }
            req.session.userId = user._id
            req.session.role = user.role
            res.redirect('/')
        } catch (error) {
            return next(ApiError.internal('Internal Server Error'));
        }
    }
}

module.exports = new UserController();
