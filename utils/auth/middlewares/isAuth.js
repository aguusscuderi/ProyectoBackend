const logger = require('../../log/index')
function isAuth (req, res, next){
    if(req.isAuthenticated()){
        let user = req.user
        req.session.user = user
        /*if(user){
            if(req.session.authenticated){
                res.redirect('/')
            }else{
                if(user[0].pswd){
                    req.session.authenticated = true
                    req.session.user = {
                        ...user
                    } 
                    res.redirect('/')
                }else{
                    logger.getLogger('outerror').error('User pswd not found!') 
                    res.sendStatus(401)
                }
            }
        }else{
            logger.getLogger('outerror').error('Not auth user found!') 
            res.sendStatus(401)
        }*/
        res.redirect('/')
    }else{
        logger.getLogger('outwarning').warn(`User not authenticated!`)
        res.redirect('/api/login')
    }
}

module.exports =  { isAuth }