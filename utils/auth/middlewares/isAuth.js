function isAuth (req, res, next){
    if(req.isAuthenticated()){
        let user = req.user
        if(user){
            if(req.session.authenticated){
                res.render('authIndex', { user_data: req.session.user.user[0] })
            }else{
                if(user[0].pswd){
                    req.session.authenticated = true
                    req.session.user = {
                        user
                    }
                    res.render('authIndex', { user_data: req.session.user.user[0] })
                }else{
                    console.log('bad credentials 1')
                }
            }
        }else{
            console.log('bad credentials 2')
        }
        next()
    }else{
        console.log('salio mal xd')
        res.redirect('/api/login')
    }
}

module.exports =  { isAuth }