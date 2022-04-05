let p = document.getElementById("contenedor");
const addMessage = (message, userEmail) =>{
    p.innerHTML += `
                <div style="margin-bottom: 30px;">
                    <h3 style="margin: 0px;">${userEmail}</h3>
                    <b> ${message.date} </b>
                    <p style="margin: 0px;">${message.message}</p>
                </div>
            `
}

const loadMessage = (messages) => {
    messages.forEach(msg => {
        addMessage(msg.message, msg.user.email)
    })
}