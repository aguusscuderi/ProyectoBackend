const boughtClass = require('../components/cart/crud/index')
const bought = new boughtClass()
const { transporter } = require('../utils/mail/index')
const ObjectID = require('mongodb').ObjectID
const logger = require('../utils/log/index')

let sendEmail = async (user, finalPrice, order) => {
    try {
        await transporter.sendMail({
            from: '"Bought Succeed!" <coderhouse@backend-project.com>',
            to: user.email,
            subject: "Bought Succeed! ✔",
            html: `
                    <h1> ${user.name}, tu compra fue lograda con exito! </h1>
                    <br>
                    <b> El valor total de tu compra es de: $${finalPrice} </b>
                    <br>
                    <b> Tu numero de orden es: ${order} </b>
            `, 
          })       
    }catch(error){
        logger.getLogger('outerror').error('Email sending ERROR!', err) 
    }

}

let boughtCreator = async (req, res) => {
    const cartData = req.body
    const finalPrice = cartData.pop()
    cartData.slice()
    const dataUser = req.user[0]
    const order = new ObjectID()
    let boughtData = {
        products:[
            ...cartData
        ],
        user: {
            _id: dataUser._id,
            email: dataUser.email,
            name: dataUser.name,
            phone: dataUser.phone,
            address: dataUser.address
        },
        finalPrice: finalPrice,
        date: new Date().toUTCString(),
        order: order
    }
    await bought.save(boughtData)
    await sendEmail(dataUser, finalPrice, order)
}

module.exports = { 
    boughtCreator
}