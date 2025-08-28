// dynamically add data to database
require('dotenv').config()

const connectDB = require('./db/connect'); // connect to database
const Product = require('./models/products'); // get database schema

const jsonProducts = require('./products.json'); // json with sample products

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        await Product.deleteMany(); // delete all current entries
        await Product.create(jsonProducts); // create new products based on array
        console.log('Success');
        process.exit(0); // exit process
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();