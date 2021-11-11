const express = require('express')
const app = express()
//const cors = cors()
const path = require('path')
const serverRouter = require('./routes')

const PORT = 8080

//app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req,res)=>{
    res.redirect('/api/index')
})
serverRouter(app)


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
