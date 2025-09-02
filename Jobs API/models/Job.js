const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        require: [true, 'Please enter the company name'],
        maxlength: 50
    },
    position: {
        type: String,
        require: [true, 'Please enter the position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // ObjectID is of the User module
        require: [true, 'Please provide a user']
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);