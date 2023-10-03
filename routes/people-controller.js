const express = require('express')
const router = express.Router()
const {createPeople, getOneUser, getAllUsers, updatePeople,deletePeople} = require('../controllers/people')

router.route('/').get(getAllUsers).post(createPeople)
router.route('/:id').get(getOneUser).put(updatePeople).delete(deletePeople);

module.exports = router;