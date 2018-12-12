'use strict'

const router = require('express').Router({ mergeParams: true })
const products = require('../controllers/products')

  
router.route('/new')
  .post(products.new)

router.route('/product/:type')
  .get(products.getProducts)

router.route('/patient')
  .get(products.getProduct)



module.exports = router
