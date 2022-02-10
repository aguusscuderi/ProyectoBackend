
let {Schema, model} = require('mongoose')
const { userCreateSchema } = require('../../components/users/schema/userSchema')
const userSchema = new Schema(userCreateSchema)
const userModel = model('users', userSchema)

class User {

    async save(user){
        try {
            await userModel.create(user)
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
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
    }
}
module.exports = User