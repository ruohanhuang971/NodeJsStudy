const express = require('express');
const app = express();
const { data } = require('react-router-dom');

const people_router = require('./routes/people');
const login_router = require('./routes/auth');

// set up static assets
app.use(express.static('./methods-public'));
// parse from data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

app.use('/api/people', people_router)
app.use('/login', login_router)


app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});