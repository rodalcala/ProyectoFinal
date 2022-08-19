//Definiendo nuestros productos y su stock
let productos = []
class Producto {constructor (nombre, precio, stockInicial, imagen, can) //funcion constructora de productos objetos
                {this.nombre = nombre
                this.precio = precio
                this.stock = parseInt(stockInicial) //stock inicial del producto
                this.imagen = imagen
                this.can = can}} //cantidad seleccionada

const planta = new Producto ("Planta", 400, 2, "planta.jpeg", 1) ; productos.push(planta)
const kokedama = new Producto ("Kokedama", 1000, 2, "kokedama.jpeg", 1) ; productos.push(kokedama)
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
else{localStorage.setItem("productos",JSON.stringify(productos))}
crearCarritoOnStorage() //Agrega a la lista de carrito los items que habia on storage
mostrarTotalCarrito() //Calculo de total del carrito on storage y Muestra total



//Definiendo las funciones del proceso de compra
function actualizarStock(productoIngresado) {
    productoIngresado.stock = productoIngresado.stock - 1 
}


function verificarStock(productoIngresado) {
    if (productoIngresado.stock >= 1){stock=true}else{stock=false}
    return stock
}

function guardarEnLocalStorage() {
    localStorage.setItem("carrito",JSON.stringify(carrito))
    localStorage.setItem("productos",JSON.stringify(productos))
}

function mostrarTotalCarrito() {    
    totalCarrito = carrito.reduce((suma,el) => (suma + (el.precio*el.can)),0)
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
                    <td>$${productoCarrito.precio*productoCarrito.can}</td>`
    tabla.appendChild(productoAgregado)
})}

function crearLineaEnCarrito(productoElegido) {
    const productoAgregado = document.createElement("tr")
    productoAgregado.innerHTML =
                    `<td>${productoElegido.nombre}</td>
					<td>$${productoElegido.precio}</td>
                    <td>${productoElegido.can}</td>
                    <td>$${productoElegido.precio*productoElegido.can}</td>`
    tabla.appendChild(productoAgregado)}

/* function cambiarCantidad() {
    productos.forEach (producto => {   
    let cantidadProductos = document.getElementById(`cantidad-producto-${producto.nombre}`);
        cantidadProductos.addEventListener("change", (e) => {
        let nuevaCantidad = e.target.value;
        producto.can = nuevaCantidad; })})
} */

function agregarAlCarrito (productoElegido) {
    stock = verificarStock(productoElegido)
    if(stock===false) {alert(`No hay mas stock de ${productoElegido.nombre} , lo sentimos mucho`)}
        else {const existe = carrito.find(producto => producto.nombre === productoElegido.nombre);
            if (existe===undefined) 
            {carrito.push(productoElegido)
            crearLineaEnCarrito(productoElegido)}
            else
            {existe.can=existe.can+1;
            tabla.innerHTML= ""
            crearCarritoOnStorage()}
                //alert(`Agregaste ${productoElegido.nombre} al carrito`) pero mas lindos
            actualizarStock(productoElegido)
            mostrarTotalCarrito()
            guardarEnLocalStorage()
        }}


//Creando las cards para cada producto

for (const producto of productos) {
    const card = document.createElement("div") ;
    card.innerHTML = `<img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">                 
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <a class="btn btn-dark" href="#table" id="${producto.nombre}btn">Agregar ${producto.nombre} a carrito</a>
    </div>` ;
    card.className = "card col-12 col-md-4 col-lg-3" ;
    cards.appendChild(card) ;
}



//Agregando al carrito la card elegida

/* cambiarCantidad() */
productos.forEach(producto => 
    {document.getElementById(`${producto.nombre}btn`).addEventListener("click",function(){agregarAlCarrito(producto)})});
