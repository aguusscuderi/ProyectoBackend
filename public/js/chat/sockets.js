const socket = io()

const saveMessage = (message, userEmail, userName, userID) => {
    socket.emit('client:newmessage', {
        message,
        userEmail,
        userName,
        userID
    })
}

socket.on('server:newmessage', addMessage)

socket.on('server:loadmessages', loadMessage)