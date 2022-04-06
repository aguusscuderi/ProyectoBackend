const fs = require('fs')

function adminAddProduct (req, res) {
    if(req.user){
        let user = req.user[0]
        if(user && user.rol == 'admin') {res.render('addProduct')}
        else {res.sendStatus(401)}
    }else{
        res.sendStatus(401)
    }
}

function chatView (req, res) {
    if(req.user){
        const user = req.user[0]
        res.render('chat', {user_data: user})
    } else res.sendStatus(401)
}


function indexView (req, res) {
    if(req.user) res.render('index', {user_data: req.user[0]})
    else res.render('index')
}

async function getAvatars (req, res) {
    await fs.readdir('./public/uploads', function(err, files_path){
        if(err){
            onerror(err)
            return
        }
        const file = files_path
        res.render('avatares', {pictures: file})
    }) 
}

module.exports = {
    adminAddProduct,
    chatView,
    indexView,
    getAvatars
}