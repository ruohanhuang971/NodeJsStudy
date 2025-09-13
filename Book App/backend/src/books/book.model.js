import mongoose from 'mongoose';

const book = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter book title'],
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],
    },
    category: {
        type: String,
        required: [true, 'Please enter book category'],
    },
    trending: {
        type: Boolean,
        default: false,
    },
    coverImage: {
        type: String,
        required: [true, 'Please enter book cover'],
    },
    oldPrice: {
        type: Number,
        required: [true, 'Please enter old price']
    },
    newPrice: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamp: true });

const Book = mongoose.model('Book', book);

export default Book;