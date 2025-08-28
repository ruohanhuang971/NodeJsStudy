require('dotenv').config();
require('express-async-errors');

// imports
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
const express = require('express');
const app = express();

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send(`<h1>Store API</h1><a href="/api/v1/products">product route</a>`);
});


app.use('/api/v1/products', productRouter); // connect router

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.Port || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();
