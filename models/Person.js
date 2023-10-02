const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
 name: {
  type: String,
  required:[true, 'Must provide name'],
  trim:true,
 },
 age:{
  type:Number,
  default:5
 },
 id:{
  type:Number,
 }, 
 tasks: {
  type:String,
  default:'none',
    trim:true,
  maxLength:[200, "The name can't exceed 200 characters"]
 }
},{collection: "People"})



module.exports = mongoose.model('Person', personSchema)