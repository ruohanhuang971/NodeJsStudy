const express = require('express');
const tasks = require('./routes/tasks'); // contain the different server operations
const connectDB = require('./db/connect');
require('dotenv').config(); // get url to database
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express(); // create instance
app.use(express.static('./public')); // set up static files
app.use(express.json()); // middleware: access json


app.use('/api/v1/tasks', tasks); // give path for tasks operations
// app.get('api/v1/tasks')          - get all the tasks
// app.post('api/v1/tasks')         - create new task
// app.get('api/v1/tasks/:id')      - get single task
// app.patch('api/v1/tasks/:id')    - update task
// app.delete('api/v1/tasks/:id')   - delete task

// custom 404:not found response
app.use(notFound);
app.use(errorHandler);


const port = process.env.Port || 3000; // set to whatever port is available once deployed
// invoke connectDB and only do server stuff if this succeed
// connectDB return a promise, set as async function to use 'await'
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL); // use variable from env
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();


