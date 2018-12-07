const router = require('express').Router()
const user = require('./user')
const products = require('./products')
const userProducts = require('./userProducts')
//all of the routing will be done here


module.exports = function (app) {

  app.use('/api/user', user),
  app.use('/api/products', products),
  app.use('/api/products', userProducts)

  
  
  app.use(router)
}