const mongoose = require('mongoose');


const conectDB = (url) => {
 // remember this is temporary and needs to be replaced
 return mongoose.connect(url, {
 })
}
module.exports = conectDB