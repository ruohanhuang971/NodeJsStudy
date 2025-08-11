const express = require('express');
const app = express();

// import middleware from different file
const logger = require('./logger');
const authorize = require('./authorize');
// add middleware to every route
app.use([logger, authorize]);

// reference middleware, calls logger function
app.get('/', logger, (req, res) => {
    res.send('Home');
});

app.get('/about', logger, (req, res) => {
    res.send('About');
});

app.get('/api/products', (req, res) => {
    res.send('Products');
});

app.get('/api/item', (req, res) => {
    console.log(req.user);
    res.send('Item');
});


app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});