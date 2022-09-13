/* class Producto {constructor (nombre, precio, stockInicial, imagen, can) //funcion constructora de productos objetos
                {this.nombre = nombre
                this.precio = precio
                this.stock = parseInt(stockInicial) //stock inicial del producto
                this.imagen = imagen
                this.can = can}} //cantidad seleccionada

const planta = new Producto ("Planta", 400, 2, "planta.jpeg", 1) ; productos.push(planta)
const kokedama = new Producto ("Kokedama", 1000, 2, "kokedama.jpeg", 1) ; productos.push(kokedama)
const maceta = new Producto ("Maceta", 600, 2, "maceta.jpeg", 1) ; productos.push(maceta) */

//Obteniendo nuestra base de productos desde JSON y renderizandolos
async function obtenerJsonLocal(){
    const JSON = await fetch('https://proyecto-final-two-red.vercel.app/productos.json') ;
    const data = await JSON.json() ;
    productos = data ;
    console.log(productos)
    verificarLocalStorage()
    creandoCard(productos)
}
obtenerJsonLocal()

//Definiendo variables y obteniendo elementos
let productos = []
let stock ;
let totalCarrito ;
const cards = document.getElementById("cards") 
const tabla = document.getElementById("tbody")
const tfoot = document.getElementById("tfoot")
const terminarCompra = document.getElementById("terminarCompra")
const filtro = document.getElementById("filtro") 
const buscador = document.getElementById("buscar") 
//Evento onchange a filtro
filtro.onchange = () => filtrar()
buscador.onchange = () => buscar()

//Verificar que el storage no tenga un carrito y stock de productos guardado y si es asi agregarlo al carrito actual
let carrito = []
function verificarLocalStorage(){
localStorage.getItem("carrito") && (carrito = JSON.parse(localStorage.getItem("carrito"))) ;
localStorage.getItem("productos") && (productos = JSON.parse(localStorage.getItem("productos")))  ;
}

verificarLocalStorage()
crearCarrito() //Agrega a la lista de carrito los items que habia on storage
/* carrito.forEach (producto => {mostrarSinStock(producto)}) */ //agregar si hay stock o no, no me 
mostrarTotalCarrito() //Calculo de total del carrito on storage y Muestra total


//Definiendo las funciones del proceso de compra
function actualizarStock(productoIngresado) {
    productoIngresado.stock = productoIngresado.stock - 1 ;
}

function verificarStock(productoIngresado) {
    return stock = productoIngresado.stock >= 1 ? true : false ;
}

function guardarEnLocalStorage() {
    localStorage.setItem("carrito",JSON.stringify(carrito))
    localStorage.setItem("productos",JSON.stringify(productos))
}

function mostrarTotalCarrito() {    
    totalCarrito = carrito.reduce((suma,el) => (suma + (el.precio*el.can)),0)
    carrito.length === 0 ? tfoot.innerHTML =`<th colspan="12"> No cargaste nada a tu carrito </th>` : tfoot.innerHTML = `<th colspan="12"> El total de tu carrito es de $${totalCarrito}</th>`
 }

function crearCarrito() {
    carrito.forEach(productoCarrito => {
    const productoAgregado = document.createElement("tr")
    productoAgregado.innerHTML =
                    `<td>${productoCarrito.nombre}</td>
					<td>$${productoCarrito.precio}</td>
                    <td>${productoCarrito.can}</td>
                    <td>$${productoCarrito.precio*productoCarrito.can}</td>
                    <td><button id="borrar${productoCarrito.nombre}" type="button" class="btn btn-dark">Borrar</button></td>`
    tabla.appendChild(productoAgregado)
    document.getElementById(`borrar${productoCarrito.nombre}`).addEventListener("click",function(){borrarProductoCarrito(productoCarrito)});
})}

function borrarProductoCarrito(productoDeCarrito) {
    tabla.innerHTML= ""
    productoDeCarrito.can !== 1 ? productoDeCarrito.can-=1 : (productoDeCarrito.can-=1 , carrito.splice((carrito.indexOf(productoDeCarrito)),1)) ;
    let productoEnProductos = productos.find(producto => producto.nombre === productoDeCarrito.nombre) ;
    productoEnProductos.stock+=1;
    crearCarrito() ;
    mostrarTotalCarrito() ;
    guardarEnLocalStorage() ;
    mostrarSinStock(productoDeCarrito) ;
}

function mostrarSinStock(productoElegido) {
    const sinStock = document.getElementById(`stock${productoElegido.nombre}`) ;
    stock = verificarStock(productoElegido) ;
    stock===true ? sinStock.innerHTML="" : sinStock.innerHTML = `Sin stock` ;
}

function filtrar(){ 
    let seleccion = filtro.value
    console.log(filtro.value)
    if (seleccion === "precioCreciente"){
        productos.sort((a, b) => a.precio - b.precio);
    }else if(seleccion === "precioDecreciente"){
        productos.sort((a, b) => b.precio - a.precio)
    }else if(seleccion === "alfabetico"){
        productos.sort((a, b) => a.nombre.localeCompare(b.nombre))  
    }
    cards.innerHTML = ""
    creandoCard(productos)
}

function buscar() {
    console.log(buscador.value.toLowerCase())
    let productoBuscado = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
    console.log(productoBuscado)
    cards.innerHTML = ""   
    if
    (productoBuscado.length === 0){Swal.fire('No se encontraron resultados para tu busqueda'),
    cards.innerHTML = "No se encontraron resultados para tu busqueda",
    buscador.value = ""
    }else{creandoCard(productoBuscado)}
}

/* function cambiarCantidad() {
    productos.forEach (producto => {   
    let cantidadProductos = document.getElementById(`cantidad-producto-${producto.nombre}`);
        cantidadProductos.addEventListener("change", (e) => {
        let nuevaCantidad = e.target.value;
        producto.can = nuevaCantidad; })})
} */

function agregarAlCarrito (productoElegido) {
    stock = verificarStock(productoElegido)
    if(stock===true) 
           {const existe = carrito.find(producto => producto.nombre === productoElegido.nombre);
            if (existe===undefined){
                let nuevoProducto = {...productoElegido, can:1};
                carrito.push(nuevoProducto);
                }else{
                existe.can=existe.can+1;}
            tabla.innerHTML= "" ;
            crearCarrito() ;
                //agregar alert(`Agregaste ${productoElegido.nombre} al carrito`) pero mas lindos
            actualizarStock(productoElegido) ;
            mostrarTotalCarrito() ;
            guardarEnLocalStorage() ;;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Agregaste ${productoElegido.nombre} a tu carrito`,
                showConfirmButton: false,
                timer: 1500,
              })
        }  mostrarSinStock(productoElegido)
}

//Creando las cards para cada producto Y Evento agregando al carrito la card elegida
function creandoCard(productos) {
for (const producto of productos) {
    const card = document.createElement("div") ;
    card.innerHTML = `<img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">                 
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <p id="stock${producto.nombre}" class="card-text stock"></p>
      <a class="btn btn-dark" href="#table" id="${producto.nombre}btn">Agregar ${producto.nombre} a carrito</a>
    </div>` ;
    card.className = "card col-12 col-md-4 col-lg-3" ;
    cards.appendChild(card) ;
    document.getElementById(`${producto.nombre}btn`).addEventListener("click",function(){agregarAlCarrito(producto)})
}
}

terminarCompra.onclick = () => { if (carrito.length !== 0){
    Swal.fire({
   position: 'center',
   icon: 'success',
   text: 'Tu compra fue realizada con exito',
   title: 'Gracias por tu compra',
   showConfirmButton: false,
   timer: 2000
   })
   carrito = [];
   localStorage.removeItem("carrito");
   tabla.innerHTML= "";
   crearCarrito();
   mostrarTotalCarrito();
}else{
   Swal.fire({
       position: 'center',
       icon: 'error',
       title: 'No hay nada en tu carrito',
       text: 'Elige un producto e intentalo de nuevo',
       showConfirmButton: false,
       timer: 3000
     })
}}
