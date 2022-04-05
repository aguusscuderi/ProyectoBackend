const { Router } = require('express')
const router = Router()
const passport = require('passport')
const { isAuth } = require('../utils/auth/middlewares/isAuth')
const userClass = require('../components/users/schema/userSchema')

const multer = require('multer')
const mimeTypes = require('mime-types')

const boughtController = require('../controllers/cartController')
const productController = require('../controllers/productsController')
const renderController = require('../controllers/renderController')
/*const chatController = require('../controllers/chatController')*/
const logoutController = require('../controllers/logoutController')

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: async function(req, file, cb){
        const userExists = await userClass.findOne({email: req.body.email})
        if(!userExists){
            cb("", Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype))
        }else{
            cb("error_")
        }
    }
})

const upload = multer({
    storage: storage
})

function serverRouter(app){
    app.use('/api', router)

    router.post('/signup', upload.single('userpic'), passport.authenticate('signup', {
        successRedirect: '/api/success',
        failureRedirect: '/api/failure'
    }))
    
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/api/success',
        failureRedirect: '/api/failure'
    }))

    router.get('/form', renderController.adminAddProduct)

    router.get('/productos', productController.getAll)

    router.get('/productos/:id', productController.getById)

    router.get('/login-register', (req, res)=>{ res.render('registerlogin') })

    router.get('/success', isAuth, (req, res)=>{})
    
    router.get('/logout', logoutController.Logout)

    router.get('/login-form', (req, res)=>{ res.render('login') })

    router.get('/failure', (req, res)=>{ res.send('Login failed.') })

    router.get('/avatar', async (req, res)=>{
        await fs.readdir('./public/uploads', function(err, files_path){
            if(err){
                onerror(err)
                return
            }
            const file = files_path
            res.render('avatares', {pictures: file})
        })
    })

    router.get('/chat', renderController.chatView)

    router.post('/bought', boughtController.boughtCreator)

    /*router.post('/chat', chatController.chatCreator)*/ // POLEMICO, BORRAR O ARREGLAR

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