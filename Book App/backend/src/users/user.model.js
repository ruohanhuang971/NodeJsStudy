import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const user = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Please enter username']
    },
    password: {
        type: String,
        require: [true, 'Please enter password']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
})

user.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', user);
export default User;