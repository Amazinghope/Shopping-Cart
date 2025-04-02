function Cart(name, price, id, img){
    this.item = name
    this.price = price
    this.id = id
    this.img = img
    this.quantity = 1
}

// Line 1
cartA = new Cart('Waffle with Berries', 6.50, 'cart1', '../image/image-waffle-desktop.jpg')
cartB = new Cart('Vanilla Bean Créme Brûlée', 7.00, 'cart2')
cartC = new Cart('Macaron Mix of Five', 8.00, 'cart3')

// Line 2
cartD = new Cart('Classic Tiramisu', 5.50, 'cart4')
cartE = new Cart('Pistachio Baklava', 4.00, 'cart5')
cartF = new Cart('Lemon Meringue Pie', 5.00, 'cart6')

// Line 3
cartG = new Cart('Red Velvet Cake', 4.50, 'cart7')
cartH = new Cart('Salted Caramel Brownie', 5.50, 'cart8')
cartI = new Cart ('Vanilla Panna Cotta', 6.50, 'cart9')

let allCarts = [cartA, cartB, cartC, cartD, cartE, cartF, cartG, cartH, cartI]
console.log(allCarts)

let addToCartBtns = document.querySelectorAll('btns')
let totalCartCount = document.getElementById('cart-totalcount')
let itemsList = document.getElementById('cart-items')
let clearButton = document.getElementById('clear-btn')
let totalItemsPrice = document.getElementById('total-price')
let quantity = document.getElementById('qty')

//let itemsAdded = []
//let counterValue = 1
//quantity.textContent = counterValue

// Fetch previously stored cart details from localStorage



let carts = JSON.parse(localStorage.getItem('carts')) || []
let storedTotal = localStorage.getItem('totalPrice') || '0.00';
totalItemsPrice.textContent = storedTotal // Restore/Retrieve stored total


// Add to Cart 
function addToCart (item){carts.push({...item, quantity:1})
    //let existingItem = carts.find(cartItem => cartItem.id ===item.id)// checks if there's an existing item
    //if (existingItem){
       // existingItem.quantity += 1 // Increase if item already exist

    //} else{carts.push({...item, quantity:1})}// Add new items to cart

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(carts))


   // Attach Add to cart function to button
    document.querySelectorAll('btns').forEach((button, index)=>{
        button.addEventListener('click', () =>{
            addToCart(allCarts[index])
        })
    })
    

    updatedCart()
}

// Remove from cart
itemsList.addEventListener('click', (event) => {
    if(event.target.classList.contains('remove-btn')){
        let index = event.target.getAttribute('item-index')
        carts.splice(index, 1)

        updatedCart()
    }
})

//Clear Cart
clearButton.addEventListener('click', () => {
    carts = []
    localStorage.setItem('cart', JSON.stringify(carts))
    localStorage.setItem('totalPrice', '0.00')
    updatedCart()

} )

     

function updatedCart(){
    itemsList.innerHTML = ''
    totalPrice = 0

    carts.forEach((item, index)=>{
    let removeButton = document.createElement('button')

    let showItemsListed = document.createElement('li')         
    showItemsListed.textContent = `${item.img}<br> ${item.name}- $${item.price}` 
    removeButton.textContent = 'Remove'
    removeButton.classList.add('remove-btn')
    removeButton.setAttribute('cart-value', index)
    showItemsListed.appendChild(removeButton)

    itemsList.appendChild(showItemsListed)

    // Convert's price to a number and add to total
    totalPrice += parseFloat(item.price)

    })
    
    totalCartCount.textContent = carts.length
    totalItemsPrice.textContent = totalPrice.toFixed(2)// Updates total price in 2 decimal places

    // Store in localStorage
    localStorage.setItem('carts', JSON.stringify(carts))
    localStorage.setItem('totalPrice',totalPrice.toFixed(2))

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


