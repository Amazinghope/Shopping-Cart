function Cart(name, price, id, ){
    this.name = name
    this.price = price
    this.id = id
    //this.img = img
    this.quantity = 1
}

// Line 1
cartA = new Cart('Waffle with Berries', 6.50, 'cart1', )
cartB = new Cart('Vanilla Bean Créme Brûlée', 7.00, 'cart2')
cartC = new Cart('Macaron Mix of Five', 8.00, 'cart3')

// Line 2
cartD = new Cart('Classic Tiramisu', 5.50, 'cart4')
cartE = new Cart('Pistachio Baklava', 4.00, 'cart5')
cartF = new Cart('Lemon Meringue Pie', 5.00, 'cart6')

// Line 3
cartG = new Cart('Red Velvet Cake', 4.50, 'cart7')
cartH = new Cart('Salted Caramel Brownie', 5.50, 'cart8')
cartI = new Cart ('Vanilla Panna Cotta', 6.50, 'cart9');

let allCarts = [cartA, cartB, cartC, cartD, cartE, cartF, cartG, cartH, cartI];
console.log(allCarts);


// Fetch previously stored cart details from localStorage

let cart = JSON.parse(localStorage.getItem("cart")) || []
let storedTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
//totalItemsPrice.textContent = storedTotalPrice // Restore/Retrieve stored total



//let addToCartBtns = document.querySelectorAll('#btns');
let totalCartCount = document.getElementById('cart-totalcount');
let itemsList = document.getElementById('cart-items');
let clearButton = document.getElementById('clear-btn');
let totalItemsPrice = document.getElementById('total-price');
let dessertContainer = document.getElementById('container');
let quantity = document.getElementById('qty');

//let itemsAdded = []
//let counterValue = 1
//quantity.textContent = counterValue

// Attach eventListner
document.querySelectorAll('.btns').forEach((button) => {
    button.addEventListener('click', (event) => {
    let index = event.target.getAttribute('data-index');
    addToCart(allCarts[index])
    console.log(allCarts)
    });
});



// Add to Cart Function
function addToCart(item){
    let existingItem = cart.find(cartItem => cartItem.id ===item.id);// checks if there's an existing item
    if (existingItem){
        existingItem.quantity ++; // Increase if item already exist

    } else{cart.push({...item, quantity:1})// Add new items to cart
   
    }
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart))

    updatedCart();
   // Attach Add to cart function to button
    // document.querySelectorAll('.btns').forEach((button, index)=>{
    //     button.addEventListener('click', () =>{
    //         addToCart(allCarts[index])
    //     })
    // })
    
}

// Remove from cart
function removeBtn(){
    itemsList.addEventListener('click', (event) => {
    if(event.target.classList.contains('remove-btn')){
        let index = event.target.getAttribute('item-index')
        cart.splice(index, 1)

        updatedCart()
    }
})}


//Clear Cart
clearButton.addEventListener('click', () => {
    cart = []
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('totalPrice', '0.00')
    updatedCart()

} )

     

function updatedCart(){
    itemsList.innerHTML = ''
    totalPrice = 0
    totalCartCount.textContent = cart.length;

    cart.forEach((item, index)=>{
    let removeButton = document.createElement('button')

    let showItemsListed = document.createElement('li')         
    showItemsListed.textContent = `${item.name} - $${(item.price * item.quantity).toFixed(2)}` 
    removeButton.textContent = 'Remove'
    removeButton.classList.add('remove-btn')
    removeButton.setAttribute('cart-value', index)
    showItemsListed.appendChild(removeButton)

    itemsList.appendChild(showItemsListed)
    console.log(showItemsListed)
    // Convert's price to a number and add to total
    totalPrice += item.price * item.quantity

    })
    
    //totalCartCount.textContent = cart.length
   
    // Store in localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    totalItemsPrice.textContent = totalPrice.toFixed(2)// Updates total price in 2 decimal places

    let image = document.getElementById('empty-img')

    if(totalCartCount === 0){
      
        image.style.display = "block";
      }
      
      else {
        image.style.display = "none";
    }    
     
}
console.log(itemsList)
console.log(totalItemsPrice)


