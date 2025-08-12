const express = require('express');
const router = express.Router();


const { getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')

// // http methods
// // get: read data
// router.get('/', getPeople);
// router.post('/', createPerson);
// // use postman to test
// router.post('/postman', createPersonPostman);
// // put: update data
// router.put('/:id', updatePerson);
// // delete
// router.delete('/:id', deletePerson);


router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPerson);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;