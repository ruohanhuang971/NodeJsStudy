const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./public'))

// app.get('/', (req, res) => {
//     res.status(200).send('Home Page');
// });

// app.get('/about', (req, res) => {
//     res.status(200).send('About Page');
// });

// handle all http functions
app.all('/*splat', (req, res) => {
    res.status(404).send("<h1>404 Not Found</h1>");
});

// app.listen
app.listen(5000, () => {
    console.log(`server is live on port 5000...`);
});