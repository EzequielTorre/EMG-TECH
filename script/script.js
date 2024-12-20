// Abrir y Cerrar CART

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");


cartIcon.addEventListener("click", () =>{
    cart.classList.add("active");
});

closeCart.addEventListener("click", () =>{
    cart.classList.remove("active");
});

//COMENZAR CUANDO ESTE DOCUMENTO ESTE LISTO
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", start);
}else{
    start();
}

//COMENZAR
function start(){
    addEvents();
}

//ACTUALIZAR Y VOLVER A PRESENTAR
function update(){
    addEvents();
    updateTotal();
}

//EVENTOS
function addEvents(){

    //QUITAR ARTICULOS DEL CARRO
    let cartRemove_btns = document.querySelectorAll(".cart-remove");

    console.log(cartRemove_btns);

    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    //CAMBIAR CONTENIDO DE ARTICULOS
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");

    cartQuantity_inputs.forEach((input)=>{
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // AÑADIR ARTICULOS AL CARRITO
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn)=>{
        btn.addEventListener("click", handle_addCartItem);
    });
}

//COMPRAR ORDEN
const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", handle_buyOrden);

//FUNCIONES DE MANEJO DE EVENTOS
let itemsAdded = [];

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;

    console.log(title, price, imgSrc);

let newToAdd = {
    title,
    price,
    imgSrc,
};

// El elemento de manejo ya existentes
if (itemsAdded.find((el) => el.title == newToAdd.title)){
    alert("Este articulo ya existe");
    return;
}else{
    itemsAdded.push(newToAdd);
}

//Añadir productos al carrito.
let carBoxElement = cartBoxComponent(title, price, imgSrc);
let newNode = document.createElement("div");
newNode.innerHTML = carBoxElement;
const cartContent = cart.querySelector(".cart-content");
cartContent.appendChild(newNode);

update();
}

function handle_removeCartItem(){
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter(
        (el) =>
        el.title != this.parentElement.querySelector(".cart-product-title").innerHTML
    );

    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value)|| this.value < 1 ){
        this.value = 1;
    }
    this.value = Math.floor(this.value); //PARA MANTENER EL NUMERO ENTERO

    update();
}

function handle_buyOrden(){
    if(itemsAdded.length <= 0){
        alert("¡Aún no hay ningún pedido para realizar! \nPor favor, haga un pedido primero");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Su pedido se realizó con éxito :)");
    itemsAdded = [];
    update();
}

//  FUNCIONES DE ACTUALIZAR Y RENDERIZAR
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;

    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;

        total+= price * quantity;
    });

    total = total.toFixed(2);
   //MANTENER 2 DIGITOS DESPUES DEL PUNTO DECIMAL

    totalElement.innerHTML = "$" + total;
}

//============= COMPONENTES HTML =======================
function cartBoxComponent(title, price, imgSrc){

    return `

    <div class="cart-box">
    
    <img src= ${imgSrc} alt="" class="cart-img">

    <div class="detail-box">

    <div class="cart-product-title"> ${title}</div>

    <div class="cart-price"> ${price}</div>

    <input type="number" value="1" class="cart-quantity">
    <p>Cantidad</p>
    </div>

    <!------------ ELIMINAR CART ----------->
    <i class="fa-solid fa-trash cart-remove"></i>

    </div>
    
    `
}