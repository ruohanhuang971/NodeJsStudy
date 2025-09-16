// imports
import connectDB from './db/connection.js';
import cors from 'cors'

// set-up .env
import dotenv from 'dotenv';
dotenv.config();

// express
import express from 'express';
const app = express();

// middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'], // allow this url to make request to server
    credentials: true
}));

// set up routes
import bookRoutes from './src/books/book.route.js';
import orderRoutes from './src/orders/order.route.js';
import userRoutes from './src/users/user.route.js';
import adminRoute from './src/stats/admin.stats.js';
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin", adminRoute)

// error handler
import errorHandlerMiddleware from './src/middleware/error-handler.js';
app.use(errorHandlerMiddleware);

// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// start server
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();