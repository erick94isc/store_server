'use strict'

const router = require('express').Router({ mergeParams: true })
const user = require('../controllers/user')

  
router.route('/register')
  .post(user.register)

router.route('/login')
  .post(user.login)

// router.route('/doctors')
//   .get(doctor.getDoctors)

router.route('/doctor')
  .get(user.getCurrentUser)

// router.route('/currentUser')
//   .get()

// router.route('/doctor/:id')
//   .patch(doctor.updateProfile)


module.exports = router
