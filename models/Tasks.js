const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
 name: {
  type:String,
  required:[true, 'Must provide name'],
  trim:true,
  maxLength:[20, "The name can't exceed 20 characters"]
 },
 id: {
  type: Number,
 },
 description: {
  type: String,
  required:[true, 'Must provide description'],
  trim:true,
  maxLength:[200, "The name can't exceed 200 characters"]
 }, 
 assigned: {
  type:String,
  default:''
 }
}, {collection: "Tasks"})

module.exports = mongoose.model('Tasks', taskSchema);