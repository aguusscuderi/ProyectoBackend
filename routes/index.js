require('dotenv').config()
//const url = process.env.BASE_URL
const { Router } = require('express')
const router = Router()
const passport = require('passport')
const fs = require('fs')
const productClass = require('../public/js/products')
const productsFromFile = new productClass()
/*const userClass = require('../public/js/userCRUD')
const userCRUD = new userClass()*/
const { isAuth } = require('../utils/auth/middlewares/isAuth')
const userClass = require('../components/users/schema/userSchema')

const multer = require('multer')
const mimeTypes = require('mime-types')
const { nextTick } = require('process')

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
        console.log(dataAll,'entregando la data')
        res.json(dataAll)
    })

    router.get('/carrito', (req, res) => {
        res.render('./cart')
    })

    router.get('/productos/:id', async (req, res)=>{
        let { id } = req.params
        const dataAll = await productsFromFile.getAll()
        const filteredUserById = dataAll.filter(el => el.id_manual == id) 
        filteredUserById.length == 0 ? res.send({'error': 'Producto no encontrado'}) : res.send(filteredUserById)
    })

    router.get('/login-register', (req, res)=>{
        res.render('registerlogin')
    })

    router.get('/success', isAuth, (req, res)=>{
        //res.send('succeded')
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

    router.get('/:params', (req, res) => {
        let notFound = {
            error: -1,
            desc: `Error: /${req.params.params}. La URL ${req.method} no esta autorizada.`
        }
        res.send(notFound)
    })

    router.post('/carrito', async (req, res) => {
        const data = JSON.stringify(req.body)
        await fs.promises.writeFile('./public/templates/carrito.json', data)
        res.redirect('./index')
    })

    router.post('/boughtSuccess', async (req, res) => {
        const data = JSON.stringify(req.body)
        const exists = fs.existsSync('./public/templates/bought.json')
        if(exists){
            await fs.promises.appendFile('./public/templates/bought.json', data)
        }else{
            await fs.promises.writeFile('./public/templates/bought.json', data)
        }
        res.redirect('./index')
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