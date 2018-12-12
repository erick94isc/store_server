'use strict'

const bcrypt = require('bcrypt')
const utils = require('../utils/utils')
const Products = require('../models').Products
const models = require('../models')

const PRODUCT_ERROR = {
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
    PRODUCT_NOT_FOUND: {
      status: 404,
      message: 'PRODUCT not Found',
      code: 'PRODUCT_NOT_FOUND'
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
      message: 'The PRODUCT already has an account'
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
    PRODUCT_REGISTERED: {
      status: 403,
      message: 'PRODUCT already has registered'
    }
  }
  
  function PRODUCTError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
   
  }
  
  module.exports = {
  
      new: async function (req, res){
          try{
              console.log('body', req.body)
              const { title, description, price, image, quantity, tpye} = req.body
             
                const response = await Products.create({
                  title,
                  description,
                  price,
                  image,
                  quantity,
                  tpye
                })
                console.log('response',response.status)
                res.status(200).send({message:'it was ok'})
              }catch (error) {
              if (error instanceof PRODUCTError) {
                res.status(error.status).send(error)
              }
              console.error(error)
              res.status(500).send({ message: 'Something Went Wrong' })
            }
          },
  
      getProduct: async function (req, res) {
          try {
            const {id} = req.body
            const Product = await Products.findOne({
              where: { id: id }
            })
            if (Product) {
              res.status(200).send({
                Product
              })
            } else {
              throw new PRODUCTError(PRODUCT_ERROR.PRODUCT_NOT_FOUND)
            }
          } catch (e) {
            console.error(e)
            if (e instanceof PRODUCTError) {
              res.status(e.status).send(e)
            } else {
              res.status(500).send({ message: 'Something Went Wrong' })
            }
          }
        },
         
       
  
        getProducts: async function (req,res){
            try{
              const { type } = req.params;
              const ProductsAll = await Products.findAll({ where: {tpye:type}})
              if (ProductsAll){
                  res.status(200).send({
                      ProductsAll
                  })
              } else{
                  throw new PRODUCTError(PRODUCT_ERROR.PRODUCT_NOT_FOUND)
              }
  
            }
              catch (error) {
                  console.error(error)
                  if (error instanceof PRODUCTError) {
                    res.status(error.status).send(error)
                  } else {
                    res.status(500).send({ ...PRODUCT_ERROR.ERROR, PRODUCT })
              }
                
            }
        }
  
  
  }    