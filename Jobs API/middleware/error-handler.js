const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);

    console.log(err.name)

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(item => item.message);
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: messages.join(', ') });
    }

    // Handle MongoDB duplicate key errors
    if (err.code && err.code === 11000) {
        const field = Object.keys(err.keyValue);
        const value = Object.values(err.keyValue);
        return res.status(StatusCodes.CONFLICT).json({
            msg: `Duplicate value for field '${field}': '${value}'`,
        });
    }

    // Custom errors
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware