// import moogose schema
const Task = require('../models/task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}); // query find({}) has no filters => return everything
        res.status(200).json({ tasks }); // same as {task: task}
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getTask = async (req, res) => {
    try {
        const { id: taskId } = req.params; // get id as taskId
        const task = await Task.findOne({ _id: taskId });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params; // get id as taskId
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true, // always return the updated item
            runValidators: true
        });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params; // get id as taskId
        const task = await Task.findOneAndDelete({ _id: taskId });
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` });
        }
        res.status(200).send({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}