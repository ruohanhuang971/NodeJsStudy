import User from './user.model.js';
import { StatusCodes } from 'http-status-codes';
import { UnauthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            throw new UnauthenticatedError('Please enter valid authentication');
        }
        if (admin.password !== password) {
            throw new UnauthenticatedError('Please enter valid authentication');
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(StatusCodes.OK).json({
            message: "Authentication Successful",
            token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
    } catch (error) {
        next(error);
    }
}