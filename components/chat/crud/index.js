const ChatModel = require('../schema/chatSchema')

class Chat {
    async save(chat){
        try {
            await ChatModel.create(chat)
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
           const messages = await ChatModel.find()
           return messages
        } catch (e) {
            console.log(e)
        }
    }

    /*async deleteById(id) {
        try{
            const deletedOne = await ChatModel.deleteOne({_id: id})
            return deletedOne
        }catch(e){
            console.log('error', e)
        }
        return deleteElement
    }

    async updateById(userUpdated, id){
        const updatedOne = await ChatModel.updateOne({_id: id}, {
            ...userUpdated
        })
        return updatedOne
    }*/
}
module.exports = Chat