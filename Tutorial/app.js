const express = require('express');
const app = express();
const { people } = require('./data');
const { data } = require('react-router-dom');


// set up static assets
app.use(express.static('./methods-public'));
// parse from data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

// http methods
// get: read data
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
});


// post: add data
// correspond to "<form action="/login" method="POST">" in './methods-public/index.html'
app.post('/login', (req, res) => {
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please Provide Name');
});

app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' });
    }
    res.status(201).json({ sucess: true, person: name });
});


// use postman to test
app.post('/api/postman/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' });
    }
    res.status(201).json({ sucess: true, data: [...people, name] });
});


// put: update data
app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // console.log(id, name);

    const person = people.find((p) => p.id === Number(id));
    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${id}` });
    }

    const newPeople = people.map((p) => {
        if (p.id === Number(id)) {
            p.name = name;
        }
        return p;
    })
    res.status(201).json({ sucess: true, data: newPeople });
});


// delete
app.delete('/api/people/:id', (req, res) => {
    const person = people.find((p) => p.id === Number(req.params.id));
    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${req.params.id}` });
    }

    const newPeople = people.filter((p) => p.id !== Number(req.params.id));
    res.status(201).json({ sucess: true, data: newPeople });
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});