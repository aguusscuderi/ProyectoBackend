require('dotenv').config()
const MONGOATLAS_DB = process.env.MONGOATLAS_DB_URI
const ATLASDB_NAME = process.env.DBATLAS_NAME
//const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const mongoose = require('mongoose')

const db_atlas_connection = async () => {
    try{
        await mongoose.connect(`${MONGOATLAS_DB}${ATLASDB_NAME}`)
    }catch(e){
        console.log(e)
    }
}

module.exports = db_atlas_connection