const Tasks = require('../models/Tasks');

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

const createTask = async(req, res) => {
 try{
  await Tasks.create(req.body)
  let answer2 = await Tasks.find({})
  console.log(answer2);
  res.json(answer2)
 } catch (err) {
 
 }
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


const deleteTask = async(req, res) => {
  const {idTasks} = req.params
 const answer = await Tasks.findOneAndDelete( {id: idTasks} )
 res.json(answer)
}

module.exports = {createTask, getOneTask, getAllTasks, updateTasks, deleteTask}