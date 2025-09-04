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

const getJob = async (req, res, next) => {
    try {
        const { user: { userId }, params: { id: jobId } } = req;
        const job = await Job.findOne({ _id: jobId, createdBy: userId });

        if (!job) {
            throw new NotFoundError(`No job with id ${jobId}`);
        }
        res.status(StatusCodes.OK).json({ job });
    } catch (error) {
        next(error);
    }
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

const updateJob = async (req, res, next) => {
    try {
        const { body: { company, position }, user: { userId }, params: { id: jobId } } = req;

        if (company === '' || position === '') {
            throw new BadRequestError(`Please provide company and position`);
        }

        const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
            new: true,
            runValidators: true
        });

        if (!job) {
            throw new NotFoundError(`No job with id ${jobId}`);
        }
        res.status(StatusCodes.OK).json({ job });
    } catch (error) {
        next(error);
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const { user: { userId }, params: { id: jobId } } = req;
        const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

        if (!job) {
            throw new NotFoundError(`No job with id ${jobId}`);
        }
        res.status(StatusCodes.OK).send();
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };