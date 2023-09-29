const express = require('express');
// const app = express();
const router = express.Router();

// This is wherewe work with the router app

let {people} = require('../data')

router.get('/', (req, res) => {
 res.json({ success: true, data: people })
})

router.post('/', (req, res) => {
 console.log(req.body)
 const { name } = req.body
 if(name) {
  return res.status(200).json({success: true, person: name})
 }
 res.status(404).json({success: false, msg: 'Please provide a valid name'})
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const {name} = req.body
  const {done} = req.body
  const person = people.find((person) => person.id === Number(id))
  if(!person) {
    return express.json({success: false, data: []})
  }
  const newPeople = people.map((person) =>{
    if (person.id === Number(id)) {
      person.name = name
      person.done = done
    }
    return person
  })
  res.status(202).json({data: newPeople, success: true})
})

// Delete request

router.delete('/:id', (req, res) => {
  const {id} = req.params
  const person = people.find((person) => person.id === Number(id))

  if(!person) {
    return res.status(404).json({success: false, msg: 'no matching id found'})
  }
  people = people.filter((person) => person.id !== Number(id))
  res.status(202).json({data: people, success: true})
})

// Server listener

// app.listen(5000, () => {
//   console.log("Server is listening on Port 5000")
// })

module.exports = router