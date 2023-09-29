// let {Tasks} = require('../data')
const  People = require('../models/Person');
const Tasks = require('../models/Tasks');

// Gets all the people
const getAllUsers = async(req, res) => {
//  res.json({success: true, data: Tasks})
try {
  let answer = await People.find({})
  console.log(answer);
  res.json(answer)
} catch (err) {

}
}

const getOneUser = async (req, res) => {
  const {id: idPeople} = req.params
  let answer = await People.find({id: idPeople})
  console.log(answer);
  res.json(answer)
}

const getAllTasks = async (req, res) => {

}

const getOneTask = async (req, res) => {

}

let length = People.length+1 
// Post function for creating a new person
const createPeople = async(req, res) => {
 try{
  let answer = await People.create(req.body)
  let answer2 = await People.find({})
  console.log(answer2);
  res.json(answer2)
 } catch (err) {
 
 }
}

const createTask = async(req, res) => {

}

// Put function

const updatePeople = async(req, res) => {
  try {
    console.log(req.body)
  const {id: idPeople} = req.params
  let answer = await People.findOneAndUpdate({id: idPeople}, req.body, {
    new: true, 
    runValidators: true
  })
  readPeople()
  console.log(answer)
  res.json(answer)
} catch (err) {}
}

const updateTasks = (req, res) => {

}

// Delete people

const deletePeople = async(req, res) => {
 const {id: idPeople} = req.params
 const task = await People.findOneAndDelete( {id: idPeople} )
 res.json(task)
}

const deleteTask = async(req, res) => {

}

module.exports = {createPeople, createTask, getOneUser, getAllUsers, getOneTask, getAllTasks, updatePeople,updateTasks, deletePeople, deleteTask}