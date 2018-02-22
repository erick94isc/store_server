const router = require('express').Router()
const example = require('./example')
//all of the routing will be done here


module.exports = function (app) {

  app.use('/', example)
  app.use(router)

}