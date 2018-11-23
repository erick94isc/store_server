'use strict'

const bcrypt = require('bcrypt')
const utils = require('../utils/utils')
const Patient = require('../models').Patient
const Doctor = require('../models').Doctor
const Appointment = require('../models').Appointment
const models = require('../models')

const APPOINTMENT_ERROR = {
  ERROR: {
    status: 500,
    message: 'Something Went Wrong'
  },
  PASSWORD_FAIL:{
    status: 406,
    message: 'Password Failed',
    code: 'PASSWORD_FAILED'
  },
  AUTH_FAILED: {
    status: 401,
    message: 'Auth Failed',
    code: 'AUTH_FAILED'
  },
  APPOINTMENT_NOT_FOUND: {
    status: 404,
    message: 'Patient not Found',
    code: 'PATIENT_NOT_FOUND'
  },
  APPOINTMENT_NOT_FOUND: {
    status: 404,
    message: 'Appointment not Found'
  },
  LIMIT: {
    status: 403,
    message: 'Limit Reached'
  },
  DUPLICATE: {
    status: 403,
    message: 'The appointment already has an account'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  INVALID_EMAIL: {
    status: 403,
    message: 'Invalid Email',
    code: 'INVALID_EMAIL'
  },
  INVALID_PASSWORD: {
    status: 403,
    message: 'Invalid Password',
    code: 'INVALID_PASSWORD'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  }
}

function AppointmentError(error) {
  const { status, message } = error
  this.status = status
  this.message = message
 
}

module.exports = {

    add: async function ( req, res ){
        try{
            const {}
        }catch(error){

        }
    }

    register: async function (req, res){
        try{
            const { email, password, firstName, lastName1, lastName2, telephone, cellphone, address,blood_type} = req.body
            if (!utils.validateEmail(email)) {
                // Email is invalid
                throw new PatientError(USER_ERROR.INVALID_EMAIL)
            }
            const patient = await Patient.findOne({ where: { email } })
            if (patient) {
                // Email has already been used
                throw new PatientError(USER_ERROR.DUPLICATE)
              }
              const passwordDigest = await bcrypt.hash(password, 5)  
              const response = await Patient.create({
                email,
                password: passwordDigest,
                firstName: firstName || '',
                lastName1: lastName1 || null,
                lastName2: lastName2 || null,
                telephone: telephone,
                cellphone: cellphone,
                address: address,
                blood_type: blood_type
              })
              console.log('response',response.status)
              res.status(200).send({message:'it was ok'})
            }catch (error) {
            if (error instanceof PatientError) {
              res.status(error.status).send(error)
            }
            console.error(error)
            res.status(500).send({ message: 'Something Went Wrong' })
          }
        },

    login: async function (res,req){
        try {
            console.log(req.body)
            const { email, password } = req.body
      
            const user = await Patient.scope('withPassword').findOne({
              where: { email }
            })
            if (!user) {
         
              throw new PatientError(PATIENT_ERROR.PATIENT_NOT_FOUND)
            }

            const { password: userPass } = user
            if (bcrypt.compareSync(password, userPass)) {
               
                res.status(200).send({message:'Auth succesfully'})
            }    
            else {
                // User exists but the password is incorrect
                throw new PatientError(PATIENT_ERROR.AUTH_FAILED)
              }
       } catch (error) {
        console.error(error)
        if (error instanceof PatientError) {
          res.status(error.status).send(error)
        } else {
          res.status(500).send({ message: 'Something Went Wrong' })
        }
      }
    },

    updateProfile: async function (req, res) {
        try {
            const { id_patient } = req.user
            const { email, firstName, lastName1, lastName2, telephone, cellphone, address,blood_type} = req.body
            const patient = await Patient.scope('withPassword').find({
                where: { id_patient }
              })
            if (patient) {
                // Email has already been used
                throw new PatientError(USER_ERROR.DUPLICATE)
            }
            if (!utils.validateEmail(email)) {
                // Email is invalid
                throw new PatientError(USER_ERROR.INVALID_EMAIL)
            }

            const updates = {
                email,
                firstName: firstName || patient.firstName,
                lastName1: lastName1 || patient.lastName1,
                lastName2: lastName2 || patient.lastName2,
                telephone: telephone || patient.telephone,
                cellphone: cellphone || patient.cellphone,
                address: address || patient.address,
                blood_type: blood_type || patient.blood_type
            }

            const response = await patient.update(updates)
            res.status(200).send({ message: 'Profile Updated'})

       
        }catch (error) {
            if (error instanceof PatientError) {
              res.status(error.status).send(error)
            }
            console.error(error)
            res.status(500).send({ message: 'Something Went Wrong' })
          }
    },


    getCurrentPatient: async function (req, res) {
        try {
          const id = req.user
          const patient = await Patient.findOne({
            where: { id_patient: id }
          })
          if (patient) {
            res.status(200).send({
             patient
            })
          } else {
            throw new PatientrError(PATIENT_ERROR.PATIENT_NOT_FOUND)
          }
        } catch (e) {
          console.error(e)
          if (e instanceof PatientError) {
            res.status(e.status).send(e)
          } else {
            res.status(500).send({ message: 'Something Went Wrong' })
          }
        }
      },

      getPatients: async function (req,res){
          try{
              
            const patients = await Patient.findAll()
            if (patients){
                res.status(200).send({
                    patients
                })
            } else{
                throw new PatientError(PATIENT_ERROR.PATIENT_NOT_FOUND)
            }

          }
            catch (error) {
                console.error(error)
                if (error instanceof PatientError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...PATIENT_ERROR.ERROR, error })
            }
              
          }
      }


}    