
const productsContainer = document.querySelector('.products_container')
const carritoSection = document.getElementById('cart_div')
const buy_button = document.querySelector('#buy-carrito')
const total_price = document.querySelector('#total_price')
const cart = []

document.addEventListener('DOMContentLoaded', () => {fetchDataProduct()});

const pintarCardsProduct = (data) => {
    data.forEach(producto => {
        let productDiv = document.createElement('div')
        productDiv.setAttribute('class', 'col-sm-12 col-md-4 col-lg-4')
        productDiv.innerHTML += `
            <div class="container_product" id="${producto._id}">
                <div class="images">
                    <img class="every-product_img" src="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg" />
                </div>
                <div class="product">
                    <h1 class="product_title">${producto.title}</h1>
                    <h2 class="product_price">${producto.price}</h2>
                    <p class="desc">${producto.description}</p>         
                </div>
                <button style="cursor: pointer; width: 100%" id="card-action-buy" class="button btn-dark">
                    <i class="add icon"></i>
                    Comprar
                </button>    
            </div>
        `
        productsContainer.appendChild(productDiv)
    })
    buyMaker()
    const buyButton = document.querySelectorAll('#card-action-buy')
    buyButton.forEach(butt => {
        butt.addEventListener('click', (e)=>{
            const target = e.target.parentElement
            const product = {
                _id: target.id,
                title: target.querySelector('.product_title').textContent,
                precio: target.querySelector('.product_price').textContent,
                cantidad: 1
            }
            let verification = cart.some(x => x._id == product._id)
            if(verification){
                const productToUpdate = cart.filter(el=>el._id == product._id)
                productToUpdate[0].cantidad++
                let productOnCart = document.getElementById(`onCart${productToUpdate[0]._id}`)
                let quantity_product = productOnCart.querySelector('.quantity_product')
                quantity_product.innerText = `Cantidad: ${productToUpdate[0].cantidad}`
                total_price.innerText = cart.reduce((final, item) => {return (final + (item.precio * item.cantidad ))}, 0) 
            }else{
                cart.push(product)
                pintarCarrito()
            }
        })
    })
}

const pintarCarrito = async () => {
    cart.forEach(el => {
        if(!carritoSection.contains(document.getElementById(`onCart${el._id}`))){
            let cartDiv = document.createElement('div')
            cartDiv.setAttribute('id', `onCart${el._id}`)
            cartDiv.innerHTML += `
                    <b>Titulo: ${el.title}</b>
                    <b>Precio:  ${el.precio}</b>
                    <b class="quantity_product">Cantidad: ${el.cantidad}</b>
                `
            carritoSection.appendChild(cartDiv)
            total_price.innerText = cart.reduce((final, item) => {return (final + (item.precio * item.cantidad ))}, 0) 
        }
    })
}
 

const buyMaker = () => {
    buy_button.addEventListener('click', ()=>{
        let final_price = total_price.innerText
        cart.push(final_price)
        console.log(cart)
        fetchBuyCart()
    })
}

const fetchBuyCart = () => {
    try{
        fetch("http://localhost:5000/api/bought", {
            method: 'POST', 
            body: JSON.stringify(cart), 
            headers:{ 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }catch(e){
        console.log(e, 'fetch cart error')
    }
}


const fetchCardsProduct = async () => {
    try{
        let res = await fetch('http://localhost:5000/api/productos')
        let products = await res.json()
        return products
    }catch(e){
        console.log(e, 'fetch card error')
    }
}

const fetchDataProduct = async () => {
    try{
        let productsToCard = await fetchCardsProduct()
        pintarCardsProduct(productsToCard)
    } catch(err) {
        console.log(err, 'errorrrr')
    }
}

