// Organize all the custom errors into one place

import CustomAPIError from './custom-error.js';
import BadRequestError from './bad-request.js';
import UnauthenticatedError from './unauthenticated.js';
import NotFoundError from './not-found.js';

export { CustomAPIError, BadRequestError, UnauthenticatedError, NotFoundError };