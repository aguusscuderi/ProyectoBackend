
document.addEventListener('DOMContentLoaded', () => { fetchData() });
const appendDiv = document.querySelector('.table-wrapper')

const fetchData = async () => {
    try{
        const res = await fetch('../templates/bought.json');
        const data = await res.json()
        console.log(data)
        cartPainting(data[0])
    } catch(err) {
        console.log(err, 'error')
    }
}


const cartPainting = (producto) => {

  Object.values(producto).forEach(el => {
  let div = document.createElement('div')
  div.innerHTML = `
    <h2> ${el.title} </h2>
    <p> ${el.precio} </p>
    <p> ${el.id} </p>
  `
  appendDiv.appendChild(div)
  })

}
