const router = require('express').Router()
const patient = require('./patient')
const doctor = require('./doctor')
//all of the routing will be done here


module.exports = function (app) {

  app.use('/api/patients', patient),
  app.use('/api/doctors', doctor)
  app.use(router)
}