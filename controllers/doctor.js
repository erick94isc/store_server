'use strict'

const bcrypt = require('bcrypt')
const utils = require('../utils/utils')
const Patient = require('../models').Patient
const Doctor = require('../models').Doctor
const Appointment = require('../models').Appointment
const models = require('../models')

const DOCTOR_ERROR = {
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
  DOCTOR_NOT_FOUND: {
    status: 404,
    message: 'Doctor not Found',
    code: 'DOCTOR_NOT_FOUND'
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
    message: 'The doctor already has an account'
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
  },
  DOCTOR_REGISTERED: {
    status: 403,
    message: 'Doctor already has registered'
  }
}

function DoctorError(error) {
  const { status, message } = error
  this.status = status
  this.message = message
 
}

module.exports = {

    register: async function (req, res){
        try{
            console.log('body', req.body)
            const { email, password, firstName, lastName1, lastName2, telephone, cellphone, address, department, from, to, rest_from, rest_to, isAdmin} = req.body
            if (!utils.validateEmail(email)) {
                // Email is invalid
                throw new DoctorError(DOCTOR_ERROR.INVALID_EMAIL)
            }
            const doctor = await Doctor.findOne({ where: { email } })
            if (doctor) {
                // Email has already been used
                throw new DoctorError(DOCTOR_ERROR.DUPLICATE)
              }
              const passwordDigest = await bcrypt.hash(password, 5)  
              const response = await Doctor.create({
                email,
                password: passwordDigest,
                firstName: firstName || '',
                lastName1: lastName1 || null,
                lastName2: lastName2 || null,
                telephone: telephone,
                cellphone: cellphone,
                address: address,
                department,
                from,
                to,
                rest_from,
                rest_to,
                isAdmin
              })
              console.log('response',response.status)
              res.status(200).send({message:'it was ok'})
            }catch (error) {
            if (error instanceof DoctorError) {
              res.status(error.status).send(error)
            }
            console.error(error)
            res.status(500).send({ message: 'Something Went Wrong' })
          }
        },

    login: async function (res,req){
        try {
            console.log(req)
            const { email, password } = req.body
      
            const user = await Doctor.scope('withPassword').findOne({
              where: { email }
            })
            if (!user) {
         
              throw new DoctortError(DOCTOR_ERROR.DOCTOR_NOT_FOUND)
            }

            const { password: userPass } = user
            if (bcrypt.compareSync(password, userPass)) {
               
                res.status(200).send({message:'Auth succesfully'})
            }    
            else {
                // User exists but the password is incorrect
                throw new DoctorError(DOCTOR_ERROR.AUTH_FAILED)
              }
       } catch (error) {
        console.error(error)
        if (error instanceof DoctorError) {
          res.status(error.status).send(error)
        } else {
          res.status(500).send({ message: 'Something Went Wrong' })
        }
      }
    },

    updateProfile: async function (req, res) {
        try {
            const { id } = req.user
            const { email, firstName, lastName1, lastName2, telephone, cellphone, address, department, from, to, rest_from, rest_to, isAdmin, no} = req.body
            const doctor = await Doctor.scope('withPassword').find({
                where: { id }
              })
            if (doctor) {
                // Email has already been used
                throw new DoctorError(DOCTOR_ERROR.DUPLICATE)
            }
            if (!utils.validateEmail(email)) {
                // Email is invalid
                throw new DoctorError(DOCTOR_ERROR.INVALID_EMAIL)
            }

            const updates = {
                email,
                firstName: firstName || doctor.firstName,
                lastName1: lastName1 || doctor.lastName1,
                lastName2: lastName2 || doctor.lastName2,
                telephone: telephone || doctor.telephone,
                cellphone: cellphone || doctor.cellphone,
                address: address || doctor.address,
                department: department ||  doctor.department,
                from: from || doctor.from,
                to: to || doctor.to,
                rest_from: rest_from || doctor.rest_from,
                rest_to: rest_to || doctor.rest_to,
                isAdmin: isAdmin || doctor.isAdmin,
                no: no || doctor.isAdmin
            }

            const response = await doctor.update(updates)
            res.status(200).send({ message: 'Profile Updated', response})

       
        }catch (error) {
            if (error instanceof DoctorError) {
              res.status(error.status).send(error)
            }
            console.error(error)
            res.status(500).send({ message: 'Something Went Wrong' })
          }
    },


    getCurrentDoctor: async function (req, res) {
        try {
          const id = req.user
          const doctor = await Doctor.findOne({
            where: { id: id }
          })
          if (doctor) {
            res.status(200).send({
              doctor
            })
          } else {
            throw new DoctorError(DOCTOR_ERROR.DOCTOR_NOT_FOUND)
          }
        } catch (e) {
          console.error(e)
          if (e instanceof DoctorError) {
            res.status(e.status).send(e)
          } else {
            res.status(500).send({ message: 'Something Went Wrong' })
          }
        }
      },

      getDoctors: async function (req,res){
          try{
              
            const doctors = await Doctor.findAll()
            if (doctors){
                res.status(200).send({
                    doctors
                })
            } else{
                throw new DoctortError(DOCTOR_ERROR.DOCTOR_NOT_FOUND)
            }

          }
            catch (error) {
                console.error(error)
                if (error instanceof DoctError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...DOCTOR_ERROR.ERROR, doctor })
            }
              
          }
      }


}    