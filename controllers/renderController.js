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

module.exports = {
    adminAddProduct,
    chatView,
    indexView
}