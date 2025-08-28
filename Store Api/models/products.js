const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name must be provided'],
        trim: true, // trim white space
    },
    price: {
        type: Number,
        required: [true, 'Price must be provided'],
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported' // {VALUE} access what the user provided
        }
        // enum: ['ikea', 'liddy', 'caressa', 'marcos'] // limit options for property
    }
})

module.exports = mongoose.model('Product', productSchema);