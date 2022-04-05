/* POLEMIC */
const chatClass = require('../components/chat/crud/index')
const chatCRUD = new chatClass()

let chatCreator = async (req, res) => {
    let message = req.body
    const user_data = req.user[0]
    console.log(user_data)
    let chataData = {
        message:{
            ...message
        },
        user: {
            _id: user_data._id,
            email: user_data.email,
            name: user_data.name,
        }
    }
    await chatCRUD.save(chataData)
}

module.exports = { chatCreator }