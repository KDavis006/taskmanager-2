const Person = require('../models/Person')
const mongoose = require('mongoose');
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI);

let People = [
 { 
  name: "George Washingmachine",
  age: "291",
  id: "1",
  tasks: ""
 },
 {
  name: "Napolean Bonaparte",
  age: "254",
  id: "2",
  tasks: ""
 },
 {
  
name: "Alexander Hamilton",
age: "268",
id: "3",
tasks: ""
 },
 {
  name: "William Shakesphere",
  age: "459",
  id: "4",
  tasks: ""
 },
 {
  name: "Cristopher Columbus",
  age:  "572",
  id:  "5",
  tasks:  ""
 }
]


async function add(){
 for(let i=0; i<People.length; i++){
   const person = new Person(
    People[i]
   )
   await person.validate();
   await person.save();
 }
}
add();