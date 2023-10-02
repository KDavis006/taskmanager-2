const Tasks = require('../models/Tasks')
const mongoose = require('mongoose');
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI);

let tasks = [
 { 
  name: "name",
  id: "1",
  description: 'stuff',
  assigned: ''
 },
 { 
  name: "name",
  id: "2",
  description: 'stuff',
  assigned: ''
 },
 { 
  name: "name",
  id: "3",
  description: 'stuff',
  assigned: ''
 },
 { 
  name: "name",
  id: "4",
  description: 'stuff',
  assigned: ''
 },
 { 
  name: "name",
  id: "5",
  description: 'stuff',
  assigned: ''
 }
]


async function add(){
 for(let i=0; i<tasks.length; i++){
   const task = new Tasks(
    tasks[i]
   )
   await task.validate();
   await task.save();
 }
}
add();