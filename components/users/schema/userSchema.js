let Joi = require('joi')
let { Schema, model } = require('mongoose')
let mongoose = require('mongoose')

const email = Joi.string().required()
const pswd = Joi.string().required()
const name = Joi.string()
const age = Joi.string()
const address = Joi.string().required()
const phone = Joi.number().min(5).required()

const userCreateSchema = {
    email,
    pswd,
    name,
    age,
    address,
    phone
}

const userSchema = new Schema(userCreateSchema)
const UserModel = model('users', userSchema)

module.exports = mongoose.model.userSchema || UserModel
