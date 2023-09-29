const express = require('express')
const router = express.Router()
const {createPeople, createTask, getOneUser, getAllUsers, getOneTask, getAllTasks, updatePeople, updateTasks, deletePeople, deleteTask} = require('../controllers/people')

router.route('/').get(getAllUsers).get(getOneUser).get(getOneTask).get(getAllTasks).post(createPeople).post(createTask)
router.route('/:id').put(updatePeople).put(updateTasks).delete(deletePeople).delete(deleteTask);

module.exports = router;