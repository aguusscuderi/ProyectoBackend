require('dotenv').config()
const express = require('express')
const app = express()
//const cors = cors()
const path = require('path')
const serverRouter = require('./routes')
const db_atlas_connection = require('./config/db_atlas')
const passport = require('passport')
const passport_logic = require('./utils/auth/userAuth')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('./utils/log/index')
const renderController = require('./controllers/renderController')

const {Server : IOServer} = require('socket.io')
const {Server : HttpServer} = require('http')
const server = new HttpServer(app)
const io = new IOServer(server)
const chat_logic = require('./utils/chat/index')

const PORT = process.env.PORT || 5000

//app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use((req, res, next)=>{       
    logger.getLogger('info').info(`${req.method} - ${req.url}`)
    next() 
})

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
        maxAge: 600000
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', renderController.indexView)

serverRouter(app)
db_atlas_connection()
passport_logic()
chat_logic(io)


app.get('/:params', (req, res) => {
    let notFound = {
        error: -1,
        desc: `Error: /${req.params.params}. La URL ${req.method} no esta autorizada.`
    }
    res.send(notFound)
})

server.listen(PORT, ()=> {
    console.log(`Estas conectado a http://localhost:${PORT}`)
})
