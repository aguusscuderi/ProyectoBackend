let chat_container = document.getElementById("app_chat");
let mensaje = document.getElementById("inputtext");
let btn = document.getElementById("mibtn");

let userEmail = document.getElementById('userEmail').textContent
let userName = document.getElementById('userName').textContent
let userID = document.getElementById('userID').textContent

const form_data_user = document.getElementById('form_data_user');

form_data_user.addEventListener('submit', e =>{
    e.preventDefault()
    saveMessage(mensaje.value, userEmail, userName, userID)
})