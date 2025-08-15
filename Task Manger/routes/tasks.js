const express = require('express'); // contain functionality for the different tasks
const router = express.Router();

const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');

// set up the route for each tasks
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router; 