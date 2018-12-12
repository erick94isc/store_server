'use strict'

const bcrypt = require('bcrypt')
const utils = require('../utils/utils')
const UserProducts = require('../models').UserProducts
const Products = require('../models').Products
const User = require('../models').User
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
  
      add: async function (req, res){
          try{ 
              var response = null
              console.log('body', req.body)
              const { userid, productid, quantity} = req.body
                const tmpid = await UserProducts.findOne({where:{ProductId: productid}})

                if( tmpid ){
                  console.log('Entreeeeeeeeeeeee')
                  const quantity = tmpid.quantity
                  response = await UserProducts.update(quantity) 
                  
                } else {
                  console.log(productid)
                 response = await UserProducts.create({
                    UserId: userid,
                    ProductId: req.body.productid,
                    quantity
                })
              }

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
  
        delete: async function (req, res) {
          try {
            const {id_product} = req.body
            await UserProducts.destroy({
              where: {  ProductUuid:id_product}
            })

            res.status(200).send({message: "Delete product success"})

          } catch (e) {
            console.error(e)
            if (e instanceof PRODUCTError) {
              res.status(e.status).send(e)
            } else {
              res.status(500).send({ message: 'Something Went Wrong' })
            }
          }
        },


        getCar: async function (req,res){
          try{
          const { id_user } = req.body
          const Car = await UserProducts.findAll({
            where:{ UserId: id_user}
          })
          let shoppingCar = []
          if (Car) {
            const car = JSON.parse(JSON.stringify(Car))
            for(let userProduct of car) {
              const { quantity, ProductId } = userProduct
              const product = await Products.findOne({
                where: {
                  id: ProductId
                }
              })
              shoppingCar.push({product: { ...product.toJSON() }, quantity})
            }
            res.status(200).send({
               car: shoppingCar
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
        }
      }    