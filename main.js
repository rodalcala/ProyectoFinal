

//Definiendo variables, objetos y arrays

let productoToLowerCase
let carrito = []
let stock
const productos = []
let totalCarrito
class Producto {constructor (nombre, precio, cantidad, descripcion) //funcion constructora de productos objetos
                {this.nombre = nombre
                this.precio = precio
                this.stock = parseInt(cantidad)
                this.descripcion = descripcion}}


const planta = new Producto ("planta", 400, 2, 'una planta') ; productos.push(planta)
const kokedama = new Producto ("kokedama", 1000, 1, 'una kokedama') ; productos.push(kokedama)
const maceta = new Producto ("maceta", 600, 0, '1 maceta') ; productos.push(maceta)


//Definiendo las funciones del proceso de compra

function iniciarCompra(){
    bienvenido = prompt("Hola! bienvenido a Kokekosas, queres iniciar una compra?"); 
return bienvenido.toLowerCase()
}

function solicitarProducto() {
    let producto = prompt("Ingresa el producto que queres agregar a tu carrito: \nKokedama \nMaceta \nPlanta \n'Salir' para terminar compra");
return producto.toLowerCase()
} 

function actualizarStock(productoToLowerCase) {
    for (let producto of productos)
    {if (productoToLowerCase === producto.nombre){producto.stock = producto.stock - 1 }}
}

function verificarStock(productoToLowerCase) {
    stock = productos.some((producto) => (producto.nombre === productoToLowerCase && producto.stock !== 0) ) 
; return stock
}


function ingresarProductos(productoToLowerCase) {
    do {productoToLowerCase = solicitarProducto() ;
    switch(productoToLowerCase)
        {case "kokedama": 
        stock = verificarStock(productoToLowerCase) ; 
        if(stock===false){console.log("No hay mas stock de Kokedama, lo sentimos mucho");break} ;
        carrito.push(kokedama)
        console.log("Elegiste Kokedama, su precio es $"+kokedama.precio);
        totalCarrito = carrito.reduce((suma,el) => (suma + el.precio),0) ;
        console.log("Tu carrito tiene $"+totalCarrito)
        actualizarStock(productoToLowerCase) ;
        break ;

        case "maceta": 
        stock = verificarStock(productoToLowerCase) ; 
        if(stock===false){console.log("No hay mas stock de Maceta, lo sentimos mucho");break} ;
        carrito.push(maceta)
        console.log("Elegiste Maceta, su precio es $"+maceta.precio);
        totalCarrito = carrito.reduce((suma,el) => (suma + el.precio),0) ;
        console.log("Tu carrito tiene $"+totalCarrito)
        actualizarStock(productoToLowerCase) ;
        break ;

        case "planta":
        stock = verificarStock(productoToLowerCase) ; 
        if(stock===false){console.log("No hay mas stock de Planta, lo sentimos mucho");break} ;
        carrito.push(planta)
        console.log("Elegiste planta, su precio es $"+planta.precio);
        totalCarrito = carrito.reduce((suma,el) => (suma + el.precio),0) ;
        console.log("Tu carrito tiene $"+totalCarrito)
        actualizarStock(productoToLowerCase) ;
        break ;

        case "salir": 
        totalCarrito = carrito.reduce((suma,el) => (suma + el.precio),0)
        console.log("Gracias por tu compra");
        console.log("El total en tu carrito es de $"+totalCarrito); 
        break ;

        default: alert("El producto ingresado no existe, intenta nuevamente"); }}
while(productoToLowerCase != "salir")}


//Realizando la compra

let comprar = iniciarCompra() 
while (comprar != "si" && comprar != "no")
{alert("La respuesta ingresada no es valida, intentalo de nuevo"); comprar = iniciarCompra()}

if (comprar == "si") {ingresarProductos(productoToLowerCase)}
else {alert("Gracias por tu visita, te esperamos pronto");
     console.log("No ingresaste nada a tu carrito")}

//Mostrar carrito

let carritoSimplificado = carrito.map((el) => {
        return { nombre : el.nombre , precio : el.precio }})

console.log("Te mostramos tu carrito")
console.table(carritoSimplificado)
console.log("Esperamos que vuelvas pronto!!")

//Creando las cards para cada producto

const cards = document.getElementById('cards') 

for (const producto of productos) {
    const card = document.createElement("div") ;
    card.innerHTML = `
    <img src="${producto.nombre}.jpeg" class="card-img-top" alt="${producto.nombre}">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <a href="#" class="btn btn-dark">Agregar a carrito</a>
    </div>` ;
    card.className = "card col-12 col-md-4 col-lg-3" ;
    cards.appendChild(card) ;
}

