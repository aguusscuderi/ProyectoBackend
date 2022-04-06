const logger = require('../../log/index')
function isAuth (req, res, next){
    if(req.isAuthenticated()){
        let user = req.user
        req.session.user = user
        res.redirect('/')
    }else{
        logger.getLogger('outwarning').warn(`User not authenticated!`)
        res.redirect('/api/login')
    }
}

module.exports =  { isAuth }