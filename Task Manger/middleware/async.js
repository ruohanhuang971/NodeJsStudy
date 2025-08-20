// avoid redudant try-catch blocks in controllers/tasks.js due to
// using 'await'

const asyncWrapper = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = asyncWrapper;