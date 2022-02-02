console.log('script')
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const buttonToAdd = document.querySelectorAll('.btn-dark')
const fragment = document.createDocumentFragment()
let carrito = {}
let boughts = []

document.addEventListener('DOMContentLoaded', () => {fetchData()});

const fetchCards = async () => {
    try{
        const res = await fetch('http://localhost:5000/api/productos')
        const products = await res.json()
        return products
    }catch(e){
        console.log(e, 'fetch card error')
    }
}

const fetchData = async () => {
    try{
        const productsToCard = await fetchCards()
        pintarCards(productsToCard)
    } catch(err) {
        console.log(err, 'errorrrr')
    }
}


cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const pintarCards = (data) => {
    data.forEach(producto => {
        templateCard.getElementById('card-name').textContent = producto.title
        templateCard.getElementById('card-description').textContent = producto.description
        templateCard.getElementById('card-price').textContent = producto.price
        templateCard.getElementById('card-stock').textContent = producto.stock
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    if (e.target.classList.contains('button')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}


const setCarrito = async (objeto) => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('.header').textContent,
        precio: objeto.querySelector('.left').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}

    await fetchCart() 
    pintarCarrito()
}

const pintarCarrito = async () => {
    items.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    await fetchCart()
    await pintarFooter()
}


const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
    }
    
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    const buy = document.querySelector('#buy-carrito')

    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

    buy.addEventListener('click', () => {
        boughts.push(carrito)
        carrito = {}
        fetchBuy()
        pintarCarrito()
    })
}

const btnAccion = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        fetchCart()
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
            fetchCart()
        } else {
            carrito[e.target.dataset.id] = {...producto}
            fetchCart()
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

const fetchCart = () => {
      try{
         fetch('http://localhost:5000/api/carrito', {
            method: 'POST', 
            body: JSON.stringify(carrito), 
            headers:{'Content-Type': 'application/json'}
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
     }catch(e){
         console.log(e, 'fetch cart error')
     }
}



const fetchBuy = () => {
    try{
        fetch("http://localhost:5000/api/boughtSuccess", {
            method: 'POST', 
            body: JSON.stringify(boughts), 
            headers:{ 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }catch(e){
        console.log(e, 'fetch cart error')
    }
}

