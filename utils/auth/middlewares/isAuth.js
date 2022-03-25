//const jwt = require('jsonwebtoken')

function isAuth (req, res, next){
    if(req.isAuthenticated()){
        let user = req.user
        //console.log(user)
        if(user){
            if(req.session.authenticated){
                //console.log(user[0], 'sin destructurar')
                //res.render('authIndex', { user_data: req.session.user.user[0] })
                //res.render('index', {user_data: user[0]})
                res.redirect('/')
            }else{
                if(user[0].pswd){
                    req.session.authenticated = true
                    req.session.user = {
                        ...user
                    }
                    /*jwt.sign({user_data: user}, 'mysecrectkey', (err, token)=>{
                        res.json({
                            token
                        })
                    })*/
                    //res.render('authIndex', { user_data: req.session.user.user[0] })
                    //res.render('index', {user_data: user[0]})
                    res.redirect('/')
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