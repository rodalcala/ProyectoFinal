//Definiendo nuestros productos y su stock
let productos = []
class Producto {constructor (nombre, precio, stockInicial, imagen, can) //funcion constructora de productos objetos
                {this.nombre = nombre
                this.precio = precio
                this.stock = parseInt(stockInicial)
                this.imagen = imagen
                this.can = can}}

const planta = new Producto ("Planta", 400, 2, "planta.jpeg", 1) ; productos.push(planta)
const kokedama = new Producto ("Kokedama", 1000, 1, "kokedama.jpeg", 1) ; productos.push(kokedama)
const maceta = new Producto ("Maceta", 600, 2, "maceta.jpeg", 1) ; productos.push(maceta)

//Definiendo variables y obteniendo elementos
let stock 
let totalCarrito ;
const cards = document.getElementById("cards") 
const tabla = document.getElementById("tbody")
const tfoot = document.getElementById("tfoot")


//Verificar que el storage no tenga un carrito y stock de productos guardado y si es asi agregarlo al carrito actual
let carrito = []
if (localStorage.getItem("carrito")){carrito = JSON.parse(localStorage.getItem("carrito"))}
if (localStorage.getItem("productos")){productos = JSON.parse(localStorage.getItem("productos"))}
crearCarritoOnStorage() //Agrega a la lista de carrito los items que habia on storage
totalCarrito = carrito.reduce((suma,el) => (suma + (el.precio*el.can)),0) //Calculo de total del carrito on storage
mostrarTotalCarrito() //Muestra total


//Definiendo las funciones del proceso de compra
function actualizarStock(productoIngresado) {
    for (let producto of productos)
    {if (productoIngresado.toLowerCase() === producto.nombre.toLowerCase()){producto.stock = producto.stock - producto.can }}
}

function verificarStock(productoIngresado) {
    stock = productos.some((producto) => (producto.nombre.toLowerCase() === productoIngresado.toLowerCase() && producto.stock !== 0) ) 
    return stock
}

function mostrarTotalCarrito (){    
    if (carrito.length === 0){tfoot.innerHTML =`<th colspan="12"> No cargaste nada a tu carrito </th>`} else
    {tfoot.innerHTML = `<th colspan="12"> El total de tu carrito es de $${totalCarrito}</th>`}
 }

function crearCarritoOnStorage() {
    carrito.forEach(productoCarrito => {
    const productoAgregado = document.createElement("tr")
    productoAgregado.innerHTML =
                    `<td>${productoCarrito.nombre}</td>
					<td>$${productoCarrito.precio}</td>
                    <td>${productoCarrito.can}</td>
                    <td>$${productoCarrito.precio*productoCarrito.can}</td>
					<td><button id="borrar${productoCarrito.nombre}" type="button" class="btn btn-dark">Borrar</button></td>`
    tabla.appendChild(productoAgregado)
})}

function crearLineaEnCarrito(productoElegido) {
    const productoAgregado = document.createElement("tr")
    productoAgregado.innerHTML =
                    `<td>${productoElegido.nombre}</td>
					<td>$${productoElegido.precio}</td>
                    <td>${productoElegido.can}</td>
                    <td>$${productoElegido.precio*productoElegido.can}</td>
					<td><button id="borrar${productoElegido.nombre}" type="button" class="btn btn-dark">Borrar</button></td>`
    tabla.appendChild(productoAgregado)}

function cambiarCantidad() {
    productos.forEach (producto => {   
    let cantidadProductos = document.getElementById(`cantidad-producto-${producto.nombre}`);
        cantidadProductos.addEventListener("change", (e) => {
        let nuevaCantidad = e.target.value;
        producto.can = nuevaCantidad; })})
}

function agregarAlCarrito (productoElegido) {
    stock = verificarStock(productoElegido.nombre) ; 
    if(stock===false) {alert(`No hay mas stock de ${productoElegido.nombre} , lo sentimos mucho`)}
    else {carrito.push(productoElegido)
    crearLineaEnCarrito(productoElegido)
    totalCarrito = carrito.reduce((suma,el) => (suma + (el.precio*el.can)),0)
    //alert(`Agregaste ${productoElegido.nombre} al carrito`) pero mas lindos
    actualizarStock(productoElegido.nombre)
    mostrarTotalCarrito()
    localStorage.setItem("carrito",JSON.stringify(carrito))
    localStorage.setItem("productos",JSON.stringify(productos))
}  
}

function BorrarDelCarrito(producto) { {carrito.splice(carrito.indexOf(producto),1)};
    localStorage.setItem("carrito",JSON.stringify(carrito));
    crearCarritoOnStorage()
}

//Creando las cards para cada producto

for (const producto of productos) {
    const card = document.createElement("div") ;
    card.innerHTML = `<img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">                 
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <input id="cantidad-producto-${producto.nombre}" type="number" placeholder="1" class="form-control" value="${producto.can}" min="1" max="1000" step="1" style="width: 50px;"/> 
      <br>
      <a class="btn btn-dark" href="#table" id="${producto.nombre}btn">Agregar ${producto.nombre} a carrito</a>
    </div>` ;
    card.className = "card col-12 col-md-4 col-lg-3" ;
    cards.appendChild(card) ;
}



//Agregando al carrito la card elegida

cambiarCantidad()
productos.forEach(producto => 
    {document.getElementById(`${producto.nombre}btn`).addEventListener("click",function(){agregarAlCarrito(producto)})});


//Borrar un producto del carrito
carrito.forEach(producto => 
    {document.getElementById(`borrar${producto.nombre}`).addEventListener("click",function(){BorrarDelCarrito(producto)})});

