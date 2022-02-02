const express = require('express')
const app = express()
//const cors = cors()
const path = require('path')
const serverRouter = require('./routes')
//let {Schema, model} = require('mongoose')
const db_connection = require('./config/db')
const db_atlas_connection = require('./config/db_atlas')
//let {productCreateSchema} = require('./components/users/schema/productosSchema')

const PORT = process.env.PORT || 5000

//app.use(cors("*"))
//app.use(express.json())
//app.use(express.urlencoded({extended: true}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


/*app.get('/', (req,res)=>{
    res.redirect('/api/index')
})*/

app.get('/', (req,res)=>{
    res.render('index')
})

serverRouter(app)

//const productSchema = new Schema(productCreateSchema)
//const productModel = model('productos', productSchema)

//db_connection()
db_atlas_connection()

app.get('/:params', (req, res) => {
    let notFound = {
        error: -1,
        desc: `Error: /${req.params.params}. La URL ${req.method} no esta autorizada.`
    }
    res.send(notFound)
})

app.listen(PORT, ()=> {
    console.log(`Estas conectado a http://localhost:${PORT}`)
})
