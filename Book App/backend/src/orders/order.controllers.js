import Order from "./order.model.js";
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/index.js'

export const createOrder = async (req, res, next) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(StatusCodes.OK).json({ message: "Book created successfully", order: newOrder });
    } catch (error) {
        next(error);
    }
}

export const getOrderByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        if (!orders) {
            throw new NotFoundError('Order not found');
        }
        res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        next(error);
    }
}