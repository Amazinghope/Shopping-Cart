function Cart(name, price, id) {
  this.name = name;
  this.price = price;
  this.id = id;
  //this.img = img
  this.quantity = 1;
}

// Line 1
cartA = new Cart("Waffle with Berries", 6.5, "cart1");
cartB = new Cart("Vanilla Bean Créme Brûlée", 7.0, "cart2");
cartC = new Cart("Macaron Mix of Five", 8.0, "cart3");

// Line 2
cartD = new Cart("Classic Tiramisu", 5.5, "cart4");
cartE = new Cart("Pistachio Baklava", 4.0, "cart5");
cartF = new Cart("Lemon Meringue Pie", 5.0, "cart6");

// Line 3
cartG = new Cart("Red Velvet Cake", 4.5, "cart7");
cartH = new Cart("Salted Caramel Brownie", 5.5, "cart8");
cartI = new Cart("Vanilla Panna Cotta", 6.5, "cart9");

let allCarts = [cartA, cartB, cartC, cartD, cartE, cartF, cartG, cartH, cartI];
console.log(allCarts);

// Fetch previously stored cart details from localStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let storedTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
//totalItemsPrice.textContent = storedTotalPrice // Restore/Retrieve stored total

//let addToCartBtns = document.querySelectorAll('#btns');
let totalCartCount = document.getElementById("cart-totalcount");
let itemsList = document.getElementById("cart-items");
let clearButton = document.getElementById("clear-btn");
let totalItemsPrice = document.getElementById("total-price");
let dessertContainer = document.getElementById("container");

//let itemsAdded = []
//let counterValue = 1
//quantity.textContent = counterValue

// Attach eventListner
document.querySelectorAll(".btns").forEach((button, index) => {
  button.addEventListener("click", () => {
    let index = event.target.getAttribute("data-index");
    addToCart(allCarts[index]);
  });
  //console.log(allCarts);
  //console.log(document.querySelectorAll(".btns"))
});

// Add to Cart Function
function addToCart(item) {
  
  let existingItem = cart.find((cartItem) => cartItem.id === item.id); // checks if there's an existing item
  if (existingItem) {
    existingItem.quantity++; // Increase if item already exist
  } else {
    cart.push({ ...item, quantity: 1 }); // Add new items to cart
  }
  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  updatedCart();
  cartCount()
  
}

// Cart Count 
function cartCount(){
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-totalcount').textContent = totalItems
}

// function reduceQty(){
//   let cartquantity = document.querySelectorAll('reduce-btn')
//   console.log(cartquantity)
//   let count = 0
//    count -= 1
//  cartquantity.textContent = count
// }


// Remove from cart
function removeBtn() {
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      let index = event.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      updatedCart();
    });
  });
}
//console.log(document.querySelectorAll("remove-btn"));

// Reduce Quantity Button
function reduceQty(index){ 
if (cart[index].quantity > 1){
  cart[index].quantity--; // Decrease qty by 1
}
else{cart.splice(index,1) // Removes qty item if qty is 1
}
updatedCart();
}

// //Add Event Listner to reduceQty()
document.addEventListener('click', function (event){
  if (event.target.classList.contains('reduce-btn')){
    let item = event.target.getAttribute('data-index')
    reduceQty(item)
  }
})

//Buy Button 
function buyItem(){
  let emptyCart = document.getElementById('cart-empty')
  let confirm = document.getElementById('confirm-msg')
  if(cart.length === 0){
  emptyCart.style.display = 'block'  
    return
  } else{ emptyCart.style.display = 'none'
    if(cart.length>0) {
      confirm.style.display = 'block'
     }else{
      confirm.style.display = 'none'
     }
    cart = []// clears the cart
  }
  
  updatedCart()
}

// Event Listner For Buy Button
document.getElementById('buy-btn').addEventListener('click', buyItem)

//Clear Cart
clearButton.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalPrice", "0.00");
  updatedCart();
});

// Updated cart
  function updatedCart() {
  itemsList.innerHTML = "";
  totalPrice = 0;
  totalCartCount.textContent = cart.length;

  cart.forEach((item, index) => {
    let showItemsListed = document.createElement("li");
    showItemsListed.classList.add(".remove-cart");
    showItemsListed.innerHTML = `
    <button class = "remove-btn" data-index ="${index}"> Remove </button>
    <button class = "reduce-btn" data-index = "${index}"> - </button>
    ${item.name} - $${(item.price * item.quantity).toFixed(2)}
    `;

    itemsList.appendChild(showItemsListed);
    totalPrice += item.price * item.quantity;

    console.log(showItemsListed);
    
  });

  totalCartCount.textContent = cart.length;

  localStorage.setItem("totalPrice", totalPrice.toFixed(2));
  totalItemsPrice.textContent = totalPrice.toFixed(2); // Updates total price in 2 decimal places

  
  // let reduceQuantity = cart.reduce((sum, item)=> sum + item.quantity, 0);
  // document.querySelectorAll('reduce-btn').textContent = reduceQuantity

  // Store in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalPrice", totalPrice.toFixed(2));

  let image = document.getElementById("empty-img");

  if (totalCartCount === 0 && itemsList === 0) {
    image.style.display = "block";
  } else {
    image.style.display = "none";
  }
  removeBtn();
  //reduceQty()
}
//console.log(itemsList);
//console.log(totalItemsPrice);
//console.log("Cart is updating. Current cart", cart);
