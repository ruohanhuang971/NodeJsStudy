// import moogose schema
const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    // try {
    //     const tasks = await Task.find({}); // query find({}) has no filters => return everything
    //     res.status(200).json({ tasks }); // same as {task: task}
    // } catch (error) {
    //     res.status(500).json({ msg: error });
    // }

    // after using async middleware ->
    const tasks = await Task.find({}); // query find({}) has no filters => return everything
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params; // get id as taskId
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
        // return res.status(404).json({ msg: `No task with id: ${taskId}` });

        // create custom error
        // const error = new Error('Not found');
        // error.status = 404;
        // return next(error); // pass error to custom error handler

        // use custom error class to create custom error
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    }
    res.status(200).json({ task });
});


const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params; // get id as taskId
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true, // always return the updated item
        runValidators: true
    });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    }
    res.status(200).json({ task });
});


const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params; // get id as taskId
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskId}`, 404));
    }
    res.status(200).send({ task });
});


module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}