const chatClass = require('../../components/chat/crud/index')
const chatCRUD = new chatClass()
const MongoStore = require('connect-mongo')

let chatCreator = (io) => {
    io.on('connection', async (socket) => {
        /*let cookie = socket.handshake.headers.cookie.split("connect.sid=s%3A")[1].substr(0,32)*/
        let messages = await chatCRUD.getAll()
        socket.emit('server:loadmessages', messages)
        socket.on('client:newmessage', async (data) => {
            const message = {
                date: new Date().toLocaleString(),
                message: data.message
            }
            let chataData = {
                message:{
                    ...message
                },
                user: {
                    _id: data.userID,
                    email: data.userEmail,
                    name: data.userName
                }
            }
            await chatCRUD.save(chataData)
            io.sockets.emit('server:newmessage', message, data.userEmail)
        })
    })
}

module.exports =  chatCreator 