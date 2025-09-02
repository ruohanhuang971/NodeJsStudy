const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // used for hashing (encrypting) the password before storing it
const jwt = require('jsonwebtoken');

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
        minlength: 6
    }
});

// hash the password with mongoose middleware
// uses function keyword so 'this' always points to this object
UserSchema.pre('save', async function () { // called before saving the data
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // once password is hashed can't go back
});

// uses mongoose middleware so every document can have function on them
// uses function keyword so 'this' always points to this object
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this.id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
};

// another instance function
UserSchema.methods.comparePassword = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);