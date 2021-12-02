const { Router } = require('express')
const router = Router()
const fs = require('fs')
const productClass = require('../public/js/products')
const productsFromFile = new productClass()

function serverRouter(app){
    app.use('/api', router)

    router.get('/index', async (req, res) => {
         res.render('index')
    })

    router.get('/form', async (req, res) => {
        res.render('addProduct')
    })

    router.get('/productos', async (req, res)=>{
        const dataAll = await productsFromFile.getAll()
        console.log(dataAll,'entregando la data')
        res.json(dataAll)

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

    router.get('/carrito', (req, res) => {
        res.render('./cart')
    })

    router.post('/productos', async (req, res)=>{
        let product = req.body
        await productsFromFile.save(product)
        res.redirect('index')
    })

    router.get('/productos/:id', async (req, res)=>{
        let { id } = req.params
        const dataAll = await productsFromFile.getAll()
        const filteredUserById = dataAll.filter(el => el.id == id) 
        filteredUserById.length == 0 ? res.send({'error': 'Producto no encontrado'}) : res.send(filteredUserById)
    })

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

    router.get('/:params', (req, res) => {
        let notFound = {
            error: -1,
            desc: `Error: /${req.params.params}. La URL ${req.method} no esta autorizada.`
        }
        res.send(notFound)
    })
}

module.exports = serverRouter