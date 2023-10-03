const express = require('express')
const router = express.Router()
const {createTask, getOneTask, getAllTasks, updateTasks, deleteTask} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getOneTask).put(updateTasks).delete(deleteTask);

module.exports = router;