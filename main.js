

//Definiendo variables, objetos y arrays

let carrito = []
//agregar verificar que el storage no tenga un carrito guardado y si es asi agregarlo al carrito actual
let stock
const productos = []
let totalCarrito
class Producto {constructor (nombre, precio, cantidad, descripcion, imagen) //funcion constructora de productos objetos
                {this.nombre = nombre
                this.precio = precio
                this.stock = parseInt(cantidad)
                this.descripcion = descripcion
                this.imagen = imagen}}


const planta = new Producto ("Planta", 400, 2, 'una planta', "planta.jpeg") ; productos.push(planta)
const kokedama = new Producto ("Kokedama", 1000, 1, 'una kokedama', "kokedama.jpeg") ; productos.push(kokedama)
const maceta = new Producto ("Maceta", 600, 2, '1 maceta', "maceta.jpeg") ; productos.push(maceta)


//Definiendo las funciones del proceso de compra

function actualizarStock(productoIngresado) {
    for (let producto of productos)
    {if (productoIngresado.toLowerCase() === producto.nombre.toLowerCase()){producto.stock = producto.stock - 1 }}
}

function verificarStock(productoIngresado) {
    stock = productos.some((producto) => (producto.nombre.toLowerCase() === productoIngresado.toLowerCase() && producto.stock !== 0) ) 
; return stock
}

//Creando las cards para cada producto

const cards = document.getElementById('cards') 

for (const producto of productos) {
    const card = document.createElement("div") ;
    card.innerHTML = `
    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <a class="btn btn-dark" id="${producto.nombre}btn">Agregar ${producto.nombre} a carrito</a>
    </div>` ;
    card.className = "card col-12 col-md-4 col-lg-3" ;
    cards.appendChild(card) ;
}

productos.forEach(producto => 
    {document.getElementById(`${producto.nombre}btn`).addEventListener("click",function(){agregarAlCarrito(producto)})});

 
function agregarAlCarrito (productoElegido) {
    stock = verificarStock(productoElegido.nombre) ; 
    if(stock===false) {alert(`No hay mas stock de ${productoElegido.nombre} , lo sentimos mucho`)}
    else {carrito.push(productoElegido)
    alert(`Agregaste ${productoElegido.nombre} al carrito`)
    console.log("Elegiste "+productoElegido.nombre+", su precio es $"+productoElegido.precio);
    totalCarrito = carrito.reduce((suma,el) => (suma + el.precio),0) ;
    console.log("Tu carrito tiene $"+totalCarrito)
    actualizarStock(productoElegido.nombre)
    console.log("Te mostramos tu carrito") ; 
    console.table(carrito) //agregar al local storage el carrito
}
}
/* 
const botonKokedamaCarrito = document.getElementById(`Kokedamabtn`) ;
botonKokedamaCarrito.addEventListener("click",agregarKokedamaCarrito) ;
const botonMacetaCarrito = document.getElementById(`Macetabtn`) ;
botonMacetaCarrito.addEventListener("click",agregarMacetaCarrito) ;
const botonPlantaCarrito = document.getElementById(`Plantabtn`) ;
botonPlantaCarrito.addEventListener("click",agregarPlantaCarrito) ;
 
function agregarKokedamaCarrito () {
    stock = verificarStock("kokedama") ; 
    if(stock===false) {alert("No hay mas stock de Kokedama, lo sentimos mucho")}
    else {carrito.push(kokedama)
    alert("Agregaste Kokedama al carrito")
    console.log("Elegiste Kokedama, su precio es $"+kokedama.precio);
    totalCarrito = carrito.reduce((suma,el) => (suma + el.precio),0) ;
    console.log("Tu carrito tiene $"+totalCarrito)
    actualizarStock("kokedama")
    console.log("Te mostramos tu carrito") ; 
    console.table(carrito)}
}

function agregarPlantaCarrito () {
    stock = verificarStock("Planta") ; 
    if(stock===false) {alert("No hay mas stock de Planta, lo sentimos mucho")}
    else {carrito.push(planta)
    alert("Agregaste Planta al carrito")
    console.log("Elegiste Planta, su precio es $"+planta.precio);
    totalCarrito = carrito.reduce((suma,el) => (suma + el.precio),0) ;
    console.log("Tu carrito tiene $"+totalCarrito)
    actualizarStock("Planta")
    console.log("Te mostramos tu carrito") ; console.table(carrito)}
}

function agregarMacetaCarrito () {
    stock = verificarStock("Maceta") ; 
    if(stock===false) {alert("No hay mas stock de Maceta, lo sentimos mucho")}
    else {carrito.push(maceta)
    alert("Agregaste Maceta al carrito")
    console.log("Elegiste Maceta, su precio es $"+maceta.precio);
    totalCarrito = carrito.reduce((suma,el) => (suma + el.precio),0) ;
    console.log("Tu carrito tiene $"+totalCarrito)
    actualizarStock("Maceta")
    console.log("Te mostramos tu carrito") ; console.table(carrito)
}
} */