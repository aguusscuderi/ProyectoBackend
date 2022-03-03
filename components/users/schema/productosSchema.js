let Joi = require('joi')

const id_manual = Joi.number()
const title = Joi.string().min(3).required()
const price = Joi.number().required()
const description = Joi.string()
const thumbnail = Joi.string()
const stock = Joi.number().min(1).required()

const productCreateSchema = {
    id_manual,
    title,
    price,
    description,
    thumbnail,
    stock
}

module.exports = {
    productCreateSchema
}

