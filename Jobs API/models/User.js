const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'username must be provided'],
        minlength: 3,
        maxlength: 21
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter valid email'],
        unique: true // unique index
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        minlength: 6,
        maxlength: 12
    }
});

module.exports = mongoose.model('User', UserSchema);