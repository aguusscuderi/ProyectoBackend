let Joi = require('joi')
    .extend(require('@joi/date'))
let { Schema, model } = require('mongoose')
let mongoose = require('mongoose')

const _idProduct = Joi.number().required()
const _idUser = Joi.number().required()

const email = Joi.string().required()
const name = Joi.string()
const address = Joi.string().required()
const phone = Joi.number().min(5).required()

const title = Joi.string().required()
const precio = Joi.number().required()
const cantidad = Joi.number().required()

const finalPrice = Joi.string().required()
const date =  Joi.date().format('YYYY-MM-DD').utc()
const order = Joi.string().required()

const boughtCreateSchema = {
    products: [{ 
        _idProduct,
        title,
        precio,
        cantidad
    }],
    user: {
        _idUser,
        email,
        name,
        phone,
        address
    },
    finalPrice,
    date,
    order
}



const boughtSchema = new Schema(boughtCreateSchema)
const BoughtModel = model('bought', boughtSchema)

module.exports = mongoose.model.boughtSchema || BoughtModel
