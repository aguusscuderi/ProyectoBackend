const multer = require('multer')
const mimeTypes = require('mime-types')
const userClass = require('../components/users/schema/userSchema')

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

module.exports = upload