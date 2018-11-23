'use strict'

const router = require('express').Router({ mergeParams: true })
const patient = require('../controllers/patient')

  
router.route('/register')
  .post(patient.register)

router.route('/login')
  .post(patient.login)

router.route('/patients')
  .get(patient.getPatients)

router.route('/patient/:id')
  .get(patient.getCurrentPatient)

router.route('/pacient/:id')
  .patch(patient.updateProfile)


module.exports = router
