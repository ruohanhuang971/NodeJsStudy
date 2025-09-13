import mongoose from 'mongoose';

const order = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email']
    },
    address: {
        city: {
            type: String,
            required: [true, 'Please enter city']
        },
        state: {
            type: String,
            required: [true, 'Please enter state']
        },
        country: {
            type: String,
            required: [true, 'Please enter country']
        },
        zipcode: {
            type: Number,
            required: [true, 'Please enter zipcode']
        }
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
        match: [/^(\+1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Please enter a valid phone number']
    },
    productIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
            required: true,
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    }
}, { timestamp: true });

const Order = mongoose.model('Order', order);

export default Order;