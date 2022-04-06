const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const logger = require('../log/index')
const userClass = require('../../components/users/schema/userSchema')
module.exports = function passport_logic () {
    function createHash(pswd){
        return bcrypt.hash(pswd, 10, null)
    }
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'pswd'
    }, async (req, email, pswd, done)=>{
        try {
            const userExists = await userClass.findOne({email: `${email}`})
            if(userExists){
                logger.getLogger('outwarning').warn(`El usuario ya existe!`)
                return done(null, false)
            }else{
                let user = req.body
                user.pswd = await createHash(pswd)
                user.rol = 'user'
                await userClass.create(user)
                let userData = await userClass.findOne({email: email})
                return done(null, userData) 
            }
        }catch(error){
            logger.getLogger('outerror').error('Saving error!', error) 
        }
    }))

    function isValidPswd(user, pswd){
        return bcrypt.compareSync(pswd, user.pswd)
    }
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pswd'
    }, async (email, pswd, done) => {
        const user = await userClass.findOne({email: `${email}`})
        if(!user){
            logger.getLogger('outwarning').warn(`User not found.`)
            return done(null, false)
        }else{
            if(!isValidPswd(user,pswd)){
                logger.getLogger('outwarning').warn(`Invalid password.`)
                return done(null, false)
            }else{
                done(null, user)
            }
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
            userClass.find({_id: id}, (err, user) => {
            done(err, user)
        })
    })
}
