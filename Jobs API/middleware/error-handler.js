const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);

    let customError = {
        // use error status code if it exist or else 500 interal error
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later'
    };

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map(item => item.message).join(', ');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // Mongoose duplicate key errors
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // Mongoose cast errors
    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value} `;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandlerMiddleware