const express = require('express');
const router = express.Router();

// post: add data
// correspond to "<form action="/login" method="POST">" in './methods-public/index.html'
router.post('/', (req, res) => {
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please Provide Name');
});

module.exports = router