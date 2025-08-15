const mongoose = require('mongoose');

// use schema to set up structure for documnets in database
const TasksSchema = new mongoose.Schema({
    name: { // set up properities as object (validation)
        type: String,
        required: [true, 'Must provide name'], // required name property in response
        trim: true, // trim white space
        maxlength: [20, `Name can't be more than 20 characters long`]
    },
    completed: {
        type: Boolean,
        default: false // set default value
    }
});

module.exports = mongoose.model('Task', TasksSchema);