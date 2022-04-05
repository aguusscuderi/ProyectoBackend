let Joi = require('joi')
    .extend(require('@joi/date'))
let { Schema, model } = require('mongoose')
let mongoose = require('mongoose')

const _id = Joi.number().required()
const email = Joi.string().required()
const name = Joi.string()

const message = Joi.string().required()
const date =  Joi.date().format('YYYY-MM-DD').utc()

const messageCreateSchema = {
    message: { 
        date,
        message
    },
    user: {
        _id,
        email,
        name,
    }
}



const messageSchema = new Schema(messageCreateSchema)
const MessageModel = model('messages', messageSchema)

module.exports = mongoose.model.messageSchema || MessageModel
