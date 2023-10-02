const  People = require('../models/Person');
const Tasks = require('../models/Tasks');

const getAllUsers = async(req, res) => {
try {
  let answer = await People.find({})
  console.log(answer);
  res.status(200).json({answer})
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
  try {
  let answer = await Tasks.find({})
  console.log(answer);
  res.status(200).json({answer})
} catch (err) {

}
}

const getOneTask = async (req, res) => {
  const {id: idPeople} = req.params
  let answer = await Tasks.find({id: idPeople})
  console.log(answer);
  res.json(answer)
}

const createPeople = async(req, res) => {
 try{
  await People.create(req.body)
  let answer2 = await People.find({})
  console.log(answer2);
  res.json(answer2)
 } catch (err) {
 
 }
}

const createTask = async(req, res) => {
 try{
  await Tasks.create(req.body)
  let answer2 = await Tasks.find({})
  console.log(answer2);
  res.json(answer2)
 } catch (err) {
 
 }
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

const updateTasks = async(req, res) => {
  try {
    console.log(req.body)
  const {id: idTasks} = req.params
  let answer = await Tasks.findOneAndUpdate({id: idTasks}, req.body, {
    new: true, 
    runValidators: true
  })
  readPeople()
  console.log(answer)
  res.json(answer)
} catch (err) {}
}

// Delete people

const deletePeople = async(req, res) => {
 const {id: idPeople} = req.params
 const answer = await People.deleteOne( {id: idPeople} )
 res.json(answer)
}

const deleteTask = async(req, res) => {
  const {idTasks} = req.params
 const answer = await Tasks.findOneAndDelete( {id: idTasks} )
 res.json(answer)
}

module.exports = {createPeople, createTask, getOneUser, getAllUsers, getOneTask, getAllTasks, updatePeople,updateTasks, deletePeople, deleteTask}