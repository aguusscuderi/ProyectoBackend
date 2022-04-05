require('dotenv').config()
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
});

/*transporter.verify().then(()=>{
    console.log('sending emails')
})*/

module.exports = { transporter }