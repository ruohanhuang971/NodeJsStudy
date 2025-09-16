import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const authMiddleware = async (req, res, next) => {
    // check header
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.error("CANT FIND")
            throw new UnauthenticatedError('Authentication invalid')
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error(error);
                throw new UnauthenticatedError('Authentication invalid');
            }
            // attach the user to the job routes
            req.user = user;
            next();
        });
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
        next(error);
    }
}

export default authMiddleware;