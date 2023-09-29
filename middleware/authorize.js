const authorize = (req, res, next) => {
 // an example of how an api key can be used. NOT PROPER FOR REAL USE. this is just a small example
 const {apiKey} = req.query
 if (apiKey === 'ping') {
  console.log('Authorizarion granted')
  // this modifies the request object for the next response
  req.user = {name: 'Jimmy Johns', id: 123456}
  next()
 } else {
  console.log('Authorizarion denied')
  res.send({results:[], status:401, message: "Access denied"})
  // next()
 }
}

module.exports = authorize;