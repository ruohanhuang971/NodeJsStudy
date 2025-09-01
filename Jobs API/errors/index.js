// organize all the custom errors into one place

const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');

module.exports = { CustomAPIError, BadRequestError, UnauthenticatedError };