const mongoose = require('mongoose');

// create function to connect so server will only connect if database
// connect is sucessful
const connectDB = (url) => {
    return mongoose.connect(url);
}

module.exports = connectDB;