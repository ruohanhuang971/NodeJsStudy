const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res, next) => {
    // only look for jobs related to current user
    try {
        const jobs = await Job.find({ createdBy: req.user.userId }) // filter jobs by userID
            .sort('createdAt'); // sort by created time

        res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
    } catch (error) {
        next(error);
    }
}

const getJob = async (req, res) => {
    res.send('get sinlge job');
}

const createJob = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.userId; // get id of User from req.user
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({ job });
    } catch (error) {
        next(error);
    }
}

const updateJob = async (req, res) => {
    res.send('update job');
}

const deleteJob = async (req, res) => {
    res.send('delete job');
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };