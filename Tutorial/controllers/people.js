let { people } = require('../data');

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' });
    }
    res.status(201).json({ sucess: true, person: name });
};

const createPersonPostman = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide name value' });
    }
    res.status(201).json({ sucess: true, data: [...people, name] });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
    const person = people.find((p) => p.id === Number(req.params.id));
    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${req.params.id}` });
    }

    const newPeople = people.filter((p) => p.id !== Number(req.params.id));
    res.status(201).json({ sucess: true, data: newPeople });
};


module.exports = {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
};