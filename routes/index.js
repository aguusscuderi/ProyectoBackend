require('dotenv').config()
//const url = process.env.BASE_URL
const { Router } = require('express')
const router = Router()
const passport = require('passport')
const fs = require('fs')
const productClass = require('../components/products/crud/products')
const productsFromFile = new productClass()
const { isAuth } = require('../utils/auth/middlewares/isAuth')
const userClass = require('../components/users/schema/userSchema')

const boughtClass = require('../components/cart/crud/index')
const boughtCRUD = new boughtClass()

const multer = require('multer')
const mimeTypes = require('mime-types')

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

    router.get('/index', (req, res)=>{
        res.render('index')
    })

    router.get('/form', async (req, res) => {
       // res.render('addProduct', {url: `${url}/api/productos`})
        res.render('addProduct')
    })

    router.get('/productos', async (req, res)=>{
        const dataAll = await productsFromFile.getAll()
        res.json(dataAll)
    })

    router.get('/carrito', (req, res) => {
        res.render('./cart')
    })

    router.get('/productos/:id', async (req, res)=>{
        let { id } = req.params
        const dataAll = await productsFromFile.getAll()
        const filteredUserById = dataAll.filter(el => el._id == id) 
        filteredUserById.length == 0 ? res.send({'error': 'Producto no encontrado'}) : res.send(filteredUserById)
    })

    router.get('/login-register', (req, res)=>{
        res.render('registerlogin')
    })

    
    router.get('/success', isAuth, (req, res)=>{

    })
    
    router.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if(!err) {
                setTimeout(()=>{
                    res.redirect('/')
                }, 2000)
            }else res.send({status: 'Logout error', body: err})
        })
    })

    router.get('/login-form', (req, res)=>{
        res.render('login')
    })

    router.get('failure', (req, res)=>{
        res.send('failure')
    })

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

    router.get('/admin', (req, res)=>{
        res.render('adminLogin')
    })

    router.get('/:params', (req, res) => {
        let notFound = {
            error: -1,
            desc: `Error: /${req.params.params}. La URL ${req.method} no esta autorizada.`
        }
        res.send(notFound)
    })

    router.post('/bought', async (req, res)=>{
        const cartData = req.body
        const finalPrice = cartData.pop()
        cartData.slice()
        const dataUser = req.user[0]
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
            date: new Date().toUTCString()
        }
        await boughtCRUD.save(boughtData)
    })

  
    router.post('/productos', async (req, res)=>{
        let product = req.body
        //console.log(req.body)
        await productsFromFile.save(product)
        res.redirect('index')
    })

    router.post('/signup', upload.single('userpic'), passport.authenticate('signup', {
        successRedirect: '/api/success',
        failureRedirect: '/api/failure'
    }))
    
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/api/success',
        failureRedirect: '/api/failure'
    }))
  

    router.put('/productos/:id', async (req, res)=>{
        let { id } = req.params
        let  productUpdated  = req.body
        await productsFromFile.updateById(productUpdated, id)
        res.send('Actualizado con exito!')
    })

    router.delete('/productos/:id', async (req, res)=>{
        let { id } = req.params.id
        await productsFromFile.deleteById(id)
        res.send(`Eliminado con exito!`)
    })

    
}

module.exports = serverRouter