const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body });  // pass req.body so mongoose validate the data
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
    } catch (error) {
        next(error); // let the customErrorHandler middleware handle the errors
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password');
        }

        // check if email exists in database
        const user = await User.findOne({ email });
        if (!user) {
            throw new UnauthenticatedError('Invalid Credentials');
        }
        // check if password matches the registerd password
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials');
        }

        const token = user.createJWT();
        res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
    } catch (error) {
        next(error); // let the customErrorHandler middleware handle the errors
    }
}

module.exports = { register, login };