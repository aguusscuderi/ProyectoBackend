const { Router } = require('express')
const router = Router()
const passport = require('passport')
const { isAuth } = require('../utils/auth/middlewares/isAuth')

const boughtController = require('../controllers/cartController')
const productController = require('../controllers/productsController')
const renderController = require('../controllers/renderController')
const logoutController = require('../controllers/logoutController')
const uploadPicController = require('../controllers/userProfilePicController')

function serverRouter(app){
    app.use('/api', router)

    router.post('/signup', uploadPicController.single('userpic'), passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/api/failure'
    }))
    
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/api/success',
        failureRedirect: '/api/failure'
    }))

    router.get('/addProduct', renderController.adminAddProduct)

    router.get('/productos', productController.getAll)

    router.get('/productos/:id', productController.getById)

    router.get('/login-register', (req, res)=>{ res.render('registerlogin') })

    router.get('/success', isAuth, (req, res)=>{})
    
    router.get('/logout', logoutController.Logout)

    router.get('/login-form', (req, res)=>{ res.render('login') })

    router.get('/failure', (req, res)=>{ res.send('Login failed.') })

    router.get('/avatar', renderController.getAvatars)

    router.get('/chat', renderController.chatView)

    router.post('/bought', boughtController.boughtCreator)

    router.post('/productos', productController.saveProduct)

    router.put('/productos/:id', productController.updateProduct)

    router.delete('/productos/:id', productController.deleteProduct)

    router.get('/:params', (req, res) => {
        let notFound = {
            error: -1,
            desc: `Error: /${req.params.params}. La URL ${req.method} no esta autorizada.`
        }
        res.send(notFound)
    })
}

module.exports = serverRouter