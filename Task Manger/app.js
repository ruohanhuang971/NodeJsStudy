const express = require('express');
const tasks = require('./routes/tasks'); // contain the different server operations
const connectDB = require('./db/connect');
require('dotenv').config(); // get url to database

const app = express(); // create instance
app.use(express.json()); // middleware: access json


app.get('/hello', (req, res) => {
    res.send('Task Manger App.');
});


app.use('/api/v1/tasks', tasks); // give path for tasks operations
// app.get('api/v1/tasks')          - get all the tasks
// app.post('api/v1/tasks')         - create new task
// app.get('api/v1/tasks/:id')      - get single task
// app.patch('api/v1/tasks/:id')    - update task
// app.delete('api/v1/tasks/:id')   - delete task


const port = 3000;

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


