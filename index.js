require('dotenv').config()
const express = require('express')
const app = express()
//const cors = cors()
const path = require('path')
const serverRouter = require('./routes')
//const db_connection = require('./config/db')
const db_atlas_connection = require('./config/db_atlas')
const passport = require('passport')
const passport_logic = require('./utils/auth/userAuth')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const PORT = process.env.PORT || 5000

//app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cookieParser())
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const MONGOATLAS_DB = process.env.MONGOATLAS_DB_URI
const ATLASDB_SESSION_NAME = process.env.DBATLAS_SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: `${MONGOATLAS_DB}${ATLASDB_SESSION_NAME}`,
        mongoOptions: advancedOptions
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //maxAge: 10000 //10 segundos
        maxAge: 600000 // 10 minutos
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req,res)=>{
    //console.log(req.user, '/')
    if(req.user) res.render('index', {user_data: req.user[0]})
    else res.render('index')
})


serverRouter(app)
//db_connection()
db_atlas_connection()
passport_logic()



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
