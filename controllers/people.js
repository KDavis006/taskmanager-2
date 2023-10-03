const  People = require('../models/Person');


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



const createPeople = async(req, res) => {
 try{
  await People.create(req.body)
  let answer2 = await People.find({})
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


// Delete people

const deletePeople = async(req, res) => {
 const {id: idPeople} = req.params
 const answer = await People.deleteOne( {id: idPeople} )
 res.json(answer)
}


module.exports = {createPeople, getOneUser, getAllUsers, updatePeople,deletePeople}