const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
 name: {
  type: String,
  required:[true, 'Must provide name'],
  trim:true,
  maxLength:[20, "The name can't exceed 20 characters"]
 },
 age:{
  type:Number,
  default:5
 },
 id:{
  type:Number,
 }, 
 task: {
  type:String,
  default:'none',
    trim:true,
  maxLength:[200, "The name can't exceed 200 characters"]
 }
},{collection: "People"})



module.exports = mongoose.model('Person', personSchema)