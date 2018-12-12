'use strict'

const router = require('express').Router({ mergeParams: true })
const userproducts = require('../controllers/userProducts')

  
router.route('/add')
  .post(userproducts.add)

router.route('/delete')
  .delete(userproducts.delete)

  router.route('/getCar')
  .get(userproducts.getCar)


module.exports = router
