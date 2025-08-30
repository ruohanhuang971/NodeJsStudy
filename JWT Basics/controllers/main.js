// practice using jwt
// check username, password in post(login) request
// if exist, create new JWT
// send back to front-end
// set up authentication so only the request with JWT can access the dashboard
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
    const { username, password } = req.body;

    // throw custom error is username or password is not provided
    if (!username || !password) {
        throw new BadRequestError('Please provide username and password');
    }

    // create token
    const id = new Date().getDate() // dummy id, usually this is provided by the database
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ msg: 'user created', token });
}


// simulate protect information
const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100); // 0-99
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
}

module.exports = { login, dashboard };