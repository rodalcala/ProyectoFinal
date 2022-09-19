//Definiendo variables y obteniendo elementos
let productos = []
let stock ;
let totalCarrito ;
let carrito = []
const cards = document.getElementById("cards") 
const tabla = document.getElementById("tbody")
const tfoot = document.getElementById("tfoot")
const terminarCompra = document.getElementById("terminarCompra")
const buscador = document.getElementById("buscar") 
const contacto = document.getElementById("contacto")
const nosotros = document.getElementById("nosotros")
const principal = document.getElementById("principal")
const home = document.getElementById("home")

//Eventos
buscador.onchange = () => buscar()
contacto.onclick = () => desplegarContacto()
nosotros.onclick = () => desplegarNosotros()
terminarCompra.onclick = () => terminandoCompra()
home.onclick = () => desplegarHome()


//////////////DEFINIENDO FUNCIONES
//Obtener mi array de productos
async function obtenerJsonLocal(){
    const JSON = await fetch('https://proyecto-final-rocio-alcala.vercel.app/productos.json') ;
    const data = await JSON.json() ;
    productos = data ;
    verificarLocalStorage()
    creandoCard(productos)
}

//Buscar si en el storage ya estaba definido productos y carrito
function verificarLocalStorage(){
    localStorage.getItem("carrito") && (carrito = JSON.parse(localStorage.getItem("carrito"))) ;
    localStorage.getItem("productos") && (productos = JSON.parse(localStorage.getItem("productos")))  ;
}

function guardarEnLocalStorage() {
    localStorage.setItem("carrito",JSON.stringify(carrito))
    localStorage.setItem("productos",JSON.stringify(productos))
}

//Manejando y verficando el stock
function actualizarStock(productoIngresado) {
    productoIngresado.stock = productoIngresado.stock - 1 ;
}

function verificarStock(productoIngresado) {
    return stock = productoIngresado.stock >= 1 ? true : false ;
}

function mostrarSinStock(productoElegido) {
    const sinStock = document.getElementById(`stock${productoElegido.nombre}`) ;
    stock = verificarStock(productoElegido) ;
    stock===true ? sinStock.innerHTML="" : sinStock.innerHTML = `Sin stock` ;
}

//Creacion del carrito
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
    document.getElementById(`borrar${productoCarrito.nombre}`).addEventListener("click",function(){borrarProductoCarrito(productoCarrito)});})
}

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

//Reordenar el array productos para filtros y buscador
function filtrar(){ 
    let seleccion = filtro.value
    if (seleccion === "precioCreciente"){
        productos.sort((a, b) => a.precio - b.precio);
    }else if(seleccion === "precioDecreciente"){
        productos.sort((a, b) => b.precio - a.precio)
    }else if(seleccion === "alfabetico"){
        productos.sort((a, b) => a.nombre.localeCompare(b.nombre))  
    }
    principal.innerHTML = ""
    creandoCard(productos)
}

function buscar() {
    console.log(buscador.value.toLowerCase())
    let productoBuscado = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
    console.log(productoBuscado)
    principal.innerHTML = ""   
    if
    (productoBuscado.length === 0){Swal.fire('No se encontraron resultados para tu busqueda'),
    principal.innerHTML = "No se encontraron resultados para tu busqueda",
    buscador.value = ""
    }else{creandoCard(productoBuscado)}
}

//Validaciones del formulario
function validacionNombre() {
    if(isNaN(nombre.value)){nombre.style.color = "black"}else{nombre.style.color = "red"}
}

function validacionNumero() {
    if(isNaN(numero.value)){numero.style.color = "red"}else{numero.style.color = "black"}
}

function validarFormulario(ev) {
    if (numero.value===""||isNaN(numero.value)||nombre.value===""||!isNaN(nombre.value)||email.value===""||consulta.value===""){
        ev.preventDefault();
        if(numero.value===""||nombre.value===""||email.value===""||consulta.value===""){
            Swal.fire('Por favor ingresa todos los datos')
        }else if(isNaN(numero.value)){
            Swal.fire('Por favor ingresa un numero de telefono valido')
        }else if(!isNaN(nombre.value)){
            Swal.fire('Por favor ingresa un nombre valido')}
        }else{ev.preventDefault(); 
             Swal.fire({title:'Gracias por tu consulta, te contactaremos a la brevedad', timer: 1500})
            numero.value =""
            nombre.value=""
            consulta.value=""
            email.value=""}
}

//Despliegue de las pestanas del menu con modificacion del DOM
function desplegarContacto() {
    contacto.className= "nav-link active"
    home.className= "nav-link"
    nosotros.className= "nav-link"
    principal.innerHTML = `
    <form id="formulario">
    <div class="mb-3">
    <label for="email" class="form-label">Direccion de e-mail</label>
    <input type="email" class="form-control" id="email" placeholder="nombre@ejemplo.com">
    </div>
    <div class="mb-3">
    <label for="nombre" class="form-label" placeholder="Ingresa tu nombre completo">Nombre y apellido</label>
    <input type="text" class="form-control" id="nombre">
    </div>
    <div class="mb-3">
    <label for="numero" class="form-label" placeholder="Ingresa tu numero de telefono">Numero de telefono</label>
    <input type="tel" class="form-control" id="numero">
    </div>
    <div class="mb-3">
    <label for="consulta" class="form-label">Contanos en que te podemos ayudar</label>
    <textarea class="form-control" id="consulta" rows="3"></textarea>
    </div>    
    <input type="submit" id="enviar" value="Enviar" class="btn btn-dark col-5 align-self-center" style="width:80px"></input>
    </form>
    `
    principal.className = "row justify-content-center"
    const nombre = document.getElementById("nombre")
    const numero = document.getElementById("numero")
    const consulta = document.getElementById("consulta")
    const formulario = document.getElementById("formulario")
    nombre.oninput = () => validacionNombre()
    numero.oninput = () => validacionNumero()
    formulario.onsubmit = (ev) => validarFormulario(ev)
}

function desplegarNosotros() {
    nosotros.className= "nav-link active"
    home.className= "nav-link"
    contacto.className= "nav-link"
    principal.innerHTML = `
    <section class="row align-items-center">
			<main class="col">
				<h2 class="h2" id="h2">BIENVENIDO!!</h2>
				<p>Kokekosas en una tienda especialmente creada para ofrecer kokedamas de autor. El arte de hacer kokedamas es una antigua técnica japonesa, “kokedama” significa en japonés bola de musgo (koke = musgo y dama = bola). Esta técnica permite mantener una planta utilizando una maceta viva, acercándote mucho más a la naturaleza. Para nosotros una kokadama es un bosque en miniatura, el olor del musgo nos transporta a estar caminando en un sotobosque, húmedo, sombrío, verde, VIVO! </p>
			</main>
	</section>
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="Nosotros.jpg" class="d-block w-100" alt="Kokekosas">
      </div>
      <div class="carousel-item">
        <img src="Nosotros2.jpeg" class="d-block w-100" alt="Kokekosas">
      </div>
      <div class="carousel-item">
        <img src="Nosotros3.jpeg" class="d-block w-100" alt="Kokekosas">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
  principal.className = "row justify-content-center"
}

function desplegarHome() {
    nosotros.className= "nav-link"
    home.className= "nav-link active"
    contacto.className= "nav-link"
    creandoCard(productos)
    principal.className= "row widgets justify-content-evenly"
}

//Terminando compra vaciando el carrito
function terminandoCompra() { 
if (carrito.length !== 0){
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
     })}
}

//Agregando cada producto al carrito segun haya stock o modificando la cantidad si ya estaba cargado
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

//Creando las cards para cada producto y evento agregando al carrito la card elegida
function creandoCard(productos) {
    principal.innerHTML= `
        <div class="input-group mb-3" id="filtros">
        <label class="input-group-text" for="filtro">Filtros</label>
        <select class="form-select" id="filtro" onchange="filtrar()">
        <option selected>Elige un filtro</option>
        <option value="precioCreciente">Precio creciente</option>
        <option class="active" value="precioDecreciente">Precio decreciente</option>
        <option value="alfabetico">A - Z</option>
        </select>
        </div>`
    for (const producto of productos) {
        principal.innerHTML += `
        <div class="card col-4 col-md-4 col-lg-3">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">                 
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <p id="stock${producto.nombre}" class="card-text stock"></p>
        <a class="btn btn-dark" id="${producto.nombre}btn">Agregar ${producto.nombre} a carrito</a>
        </div>
        </div>`}
    productos.forEach(producto => { document.getElementById(`${producto.nombre}btn`).addEventListener("click",function(){agregarAlCarrito(producto)})});   
}



////////////////EJECUTANDO LA APP
//Obtener base de datos con nuestros productos y renderizarlos
obtenerJsonLocal()
//Antes de entrar se checkea si hay algo guardado en storage, si lo hay se lo agrega al carrito y se calcula el total hasta el momento
verificarLocalStorage()
crearCarrito() 
mostrarTotalCarrito() 

