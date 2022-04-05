const productClass = require('../components/products/crud/products')
const productsFromFile = new productClass()

async function saveProduct (req, res) {
    let product = req.body
    await productsFromFile.save(product)
    res.redirect('/')
}

async function updateProduct (req, res) {
    let { id } = req.params
    let  productUpdated  = req.body
    await productsFromFile.updateById(productUpdated, id)
    res.send('Actualizado con exito!')
}

async function deleteProduct (req, res) {
    let { id } = req.params
    await productsFromFile.deleteById(id)
    res.send(`Eliminado con exito!`)
}

async function getById (req, res) {
    let { id } = req.params
    const dataAll = await productsFromFile.getAll()
    const filteredUserById = dataAll.filter(el => el._id == id) 
    filteredUserById.length == 0 ? res.send({'error': 'Producto no encontrado'}) : res.send(filteredUserById)
}

async function getAll (req, res) {
    const dataAll = await productsFromFile.getAll()
    res.json(dataAll)
}

module.exports = { 
    saveProduct,
    updateProduct,
    deleteProduct,
    getById,
    getAll
}