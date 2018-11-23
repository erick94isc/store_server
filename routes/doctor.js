'use strict'

const router = require('express').Router({ mergeParams: true })
const doctor = require('../controllers/doctor')

  
router.route('/register')
  .post(doctor.register)

router.route('/login')
  .post(doctor.login)

router.route('/doctors')
  .get(doctor.getDoctors)

router.route('/doctor/:id')
  .get(doctor.getCurrentDoctor)

router.route('/doctor/:id')
  .patch(doctor.updateProfile)


module.exports = router
