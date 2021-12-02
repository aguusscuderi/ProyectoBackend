
let {Schema, model} = require('mongoose')
let {productCreateSchema} = require('../../components/users/schema/productosSchema')
const productSchema = new Schema(productCreateSchema)
const productModel = model('productos', productSchema)

const products_db = []

class Contenedor {

    async save(product){
        try {
            await products_db.push(productModel.create(product))
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
           const prods = await productModel.find()
           return prods
        } catch (e) {
            console.log(e)
        }
    }

    async deleteById(id) {
        try{
            const deletedOne = await productModel.deleteOne({_id: id})
            return deletedOne
        }catch(e){
            console.log('error', e)
        }
        return deleteElement
    }

    async updateById(productUpdated, id){
        const updatedOne = await productModel.updateOne({_id: id}, {
            ...productUpdated
        })
        return updatedOne
    }
}
module.exports = Contenedor