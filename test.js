const axios = require('axios')
const mocha = require('mocha')
const expect = require('chai').expect

//let idTestingProduct = Date.now()

describe('Productos CRUD', ()=>{
    it('/api/productos ("GET") should return a non empty array', async function (){
        let products
         try{
            products = await axios.get('http://localhost:5000/api/productos')
        }catch(err){
             console.log('error al realizar get', err)
        }
        expect(products.data).to.be.a('array')
        expect(products.data.length).to.be.greaterThan(0)     
    })

    it('/api/productos ("POST") should add one product to DB', async function(){
        let lengthBefore = await products_lenght()
        try{
            await axios({
                method: 'post',
                url: 'http://localhost:5000/api/productos',
                data: {
                    id_manual: 1,
                    title: 'Otro producto agregado desde test.js',
                    description: 'Producto desde test.js',
                    price: 500,
                    thumbnail: 'thumbnail test.js',
                    stock: 200
                }
        })
        } catch(err){
            console.log('error al realizar el post', err)
        }
        let lengthAfter = await products_lenght()
        expect(lengthAfter).to.be.greaterThan(lengthBefore)
    })

   /*it('update should modify last product to DB and be equal in length', async function(){
        let lengthBefore = await products_lenght()
        let productBeforeUpdate = await getByIdDB(1)
        try{
            await axios({
                method: 'put',
                url: 'http://localhost:5000/api/productos/1',
                //url: `http://localhost:5000/api/productos/${}`
                data: {
                    id_manual: 1,
                    title: 'producto test.js MODIFICADO',
                    description: 'producto test.js MODIFICADO',
                    price: 1000,
                    thumbnail: 'thumbnail test.js MODIFICADO',
                    stock: 200
                }
        })
        } catch(err){
            console.log('error al realizar el update', err)
        }
        let productAfterUpdate = await getByIdDB(1)
        let lengthAfter = await products_lenght()
        
        expect(lengthAfter).to.equal(lengthBefore)
        expect(productBeforeUpdate).to.not.eql(productAfterUpdate)
        
    })*/
})

async function products_lenght(){
    let products
    try{
        products =  await axios.get('http://localhost:5000/api/productos')
    }catch(err){
        console.log('error al realizar get', err)
    }
    return products.data.length
}

/*async function getByIdDB(id){
    let products
    try{
        products = await axios.get('http://localhost:5000/api/productos')
        //console.log(products)
        const filteredProduct = products.data.filter(el => el.id_manual == id)
        return filteredProduct[0]
    }catch(err){
        console.log('error al realizar getbyid', err)
    }
    return products
}*/
