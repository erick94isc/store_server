
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils/utils')
const User = require('../models').User


const USER_ERROR = {
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
  USER_NOT_FOUND: {
    status: 404,
    message: 'USER not Found',
    code: 'USER_NOT_FOUND'
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
    message: 'The USER already has an account'
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
  USER_REGISTERED: {
    status: 403,
    message: 'USER already has registered'
  }
}

function USERError(error) {
  const { status, message } = error
  this.status = status
  this.message = message
 
}

module.exports = {

    register: async function (req, res){
        try{
            console.log('body', req.body)
            const { email, password, firstName, lastName, telephone, cellphone, address} = req.body
            if (!utils.validateEmail(email)) {
                // Email is invalid
                throw new USERError(USER_ERROR.INVALID_EMAIL)
            }
            const Usertmp = await User.findOne({ where: { email } })
            if (Usertmp) {
                // Email has already been used
                throw new USERError(USER_ERROR.DUPLICATE)
              }
              const passwordDigest = await bcrypt.hash(password, 5)  
              const response = await User.create({
                email,
                password: passwordDigest,
                firstName: firstName || '',
                lastName: lastName || null,
                telephone: telephone,
                cellphone: cellphone,
                address: address,            
              })
              console.log('response',response.status)
              res.status(200).send({message:'it was ok'})
            }catch (error) {
            if (error instanceof USERError) {
              res.status(error.status).send(error)
            }
            console.error(error)
            res.status(500).send({ message: 'Something Went Wrong' })
          }
        },

    login: async function (req,res){
        try {
            
            const { email, password } = req.body
      
            const user = await User.scope('withPassword').findOne({
              where: { email }
            })
            if (!user) {
         
              throw new USERError(USER_ERROR.USER_NOT_FOUND)
            }

            const { password: userPass } = user
            if (bcrypt.compareSync(password, userPass)) {
              const payload = {
                email: user.email,
                name: user.firstName,
                lastName: user.lastName, 
                id: user.id_user,
                time: new Date()
            }
            var token = jwt.sign(payload, 'holasoyLlave', {
              expiresIn: '24h'
            });
        
                res.status(200).send({message:'Auth succesfully', data: { token }})
            }    
           


       
            else {
                // User exists but the password is incorrect
                throw new USERError(USER_ERROR.AUTH_FAILED)
              }
       } catch (error) {
        console.error(error)
        if (error instanceof USERError) {
          res.status(error.status).send(error)
        } else {
          res.status(500).send({ message: 'Something Went Wrong' })
        }
      }
    },

    updateProfile: async function (req, res) {
        try {
            const { id } = req.user
            const { email, firstName, lastName, telephone, cellphone, address} = req.body
            const Usertmp = await User.scope('withPassword').find({
                where: { id }
              })
            if (Usertmp) {
                // Email has already been used
                throw new USERError(USER_ERROR.DUPLICATE)
            }
            if (!utils.validateEmail(email)) {
                // Email is invalid
                throw new USERError(USER_ERROR.INVALID_EMAIL)
            }

            const updates = {
                email,
                firstName: firstName || Usertmp .firstName,
                lastName: lastName1 || Usertmp.lastName1,
                telephone: telephone || Usertmp.telephone,
                cellphone: cellphone || Usertmp.cellphone,
                address: address || Usertmp.address
            }

            const response = await User.update(updates)
            res.status(200).send({ message: 'Profile Updated', response})

       
        }catch (error) {
            if (error instanceof USERError) {
              res.status(error.status).send(error)
            }
            console.error(error)
            res.status(500).send({ message: 'Something Went Wrong' })
          }
    },


    getCurrentUser: async function (req, res) {
        try {
          const {id} = req.body
          const Usertmp = await User.findOne({
            where: { id: id }
          })
          if (Usertmp) {
            res.status(200).send({
              Usertmp
            })
          } else {
            throw new USERError(USER_ERROR.USER_NOT_FOUND)
          }
        } catch (e) {
          console.error(e)
          if (e instanceof USERError) {
            res.status(e.status).send(e)
          } else {
            res.status(500).send({ message: 'Something Went Wrong' })
          }
        }
      },
       
      getUser: async function (req, res){
       
        let token2 = req.headers['authorization']
        token2 = token2.split(' ')
        const token = token2[1]
        console.log(token)
        if (!token) return res.status(400).json({type: 'error', message: 'x-access-token header not found.'})
        jwt.verify(token, 'holasoyLlave', (error, result) => {
          if (error) return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error})
          return res.json({
            type: 'success',
            message: 'Provided token is valid.',
            data: result
          })
        })
      },

      getUSERs: async function (req,res){
          try{
              
            const USERs = await USER.findAll()
            if (USERs){
                res.status(200).send({
                    USERs
                })
            } else{
                throw new USERtError(USER_ERROR.USER_NOT_FOUND)
            }

          }
            catch (error) {
                console.error(error)
                if (error instanceof DoctError) {
                  res.status(error.status).send(error)
                } else {
                  res.status(500).send({ ...USER_ERROR.ERROR, USER })
            }
              
          }
      }


}    