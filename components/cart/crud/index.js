/*let {Schema, model} = require('mongoose')
const { userCreateSchema } = require('../schema/userSchema')
const userSchema = new Schema(userCreateSchema)
const userModel = model('users', userSchema)*/

const CartModel = require('../schema/cartSchema')

class Bought {

    async save(bought){
        try {
            await CartModel.create(bought)
        } catch (error) {
            console.log(error)
        }
    }

    /*async getAll(){
        try {
           const users = await userModel.find()
           return users
        } catch (e) {
            console.log(e)
        }
    }

    async deleteById(id) {
        try{
            const deletedOne = await userModel.deleteOne({_id: id})
            return deletedOne
        }catch(e){
            console.log('error', e)
        }
        return deleteElement
    }

    async updateById(userUpdated, id){
        const updatedOne = await userModel.updateOne({_id: id}, {
            ...userUpdated
        })
        return updatedOne
    }*/
}
module.exports = Bought