// Retrieve the cart items from the localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
    return;
  }
   

  
  let totalPrice = 0;

cartItems.forEach((item) => {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  const productImage = document.createElement('img');
  productImage.src = item.image;
  productImage.alt = item.name;
  productImage.classList.add('cart-item-image');

  const productInfo = document.createElement('div');
  productInfo.classList.add('cart-item-details');

  const productName = document.createElement('h3');
  productName.textContent = item.name;

  const productPrice = document.createElement('p');
  productPrice.textContent = `Rs${item.price}`;

  const shoeSize = document.createElement('p');
  shoeSize.textContent = `Size: ${item.shoeSize}`;

  productInfo.appendChild(productName);
  productInfo.appendChild(productPrice);
  productInfo.appendChild(shoeSize);

  cartItem.appendChild(productImage);
  cartItem.appendChild(productInfo);
    

    const quantityInfo = document.createElement('div');
    quantityInfo.classList.add('cart-item-quantity');

    const quantityLabel = document.createElement('span');
    quantityLabel.textContent = 'Quantity: ';

    const quantityValue = document.createElement('span');
    quantityValue.textContent = item.quantity;
    quantityValue.classList.add('quantity');

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.classList.add('quantity-btn');
    increaseButton.addEventListener('click', () => increaseQuantity(item.productId));

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.classList.add('quantity-btn');
    decreaseButton.addEventListener('click', () => decreaseQuantity(item.productId));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteItem(item.productId));

    quantityInfo.appendChild(quantityLabel);
    quantityInfo.appendChild(decreaseButton);
    quantityInfo.appendChild(quantityValue);
    quantityInfo.appendChild(increaseButton);

    cartItem.appendChild(productImage);
    cartItem.appendChild(productInfo);
    cartItem.appendChild(quantityInfo);
    cartItem.appendChild(deleteButton);
    cartItemsContainer.appendChild(cartItem);

    totalPrice += item.price * item.quantity;
  });

  const totalPriceContainer = document.createElement('div');
  totalPriceContainer.classList.add('total');
  totalPriceContainer.innerHTML = `Total Price: $${totalPrice}`;

  cartItemsContainer.appendChild(totalPriceContainer);
}




// Function to add a product to the cart
function addToCart(productId, name, price, image) {
  const sizeSelector = document.getElementById('shoe-size');
  const selectedSize = sizeSelector.value;

  const cartItem = {
    productId,
    name,
    price,
    image,
    quantity: 1,
    shoeSize: selectedSize
  };
    // Show the confirmation message
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.textContent = 'Product added to cart!';
    confirmationMessage.style.display = 'block';
  
    // Hide the confirmation message after a few seconds
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
    }, 3000);
  

  cartItems.push(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCartItems();
}



// Function to increase quantity of a cart item
function increaseQuantity(productId) {
  const cartItem = cartItems.find(item => item.productId === productId);

  if (cartItem) {
    cartItem.quantity++;
  }

  // Save the updated cart items to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  renderCartItems();
}

// Function to decrease quantity of a cart item
function decreaseQuantity(productId) {
  const cartItem = cartItems.find(item => item.productId === productId);

  if (cartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      // Remove the item from the cart if the quantity becomes 0
      const itemIndex = cartItems.findIndex(item => item.productId === productId);
      cartItems.splice(itemIndex, 1);
    }
  }

  // Save the updated cart items to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  renderCartItems();
}

// Function to delete an item from the cart
function deleteItem(productId) {
  const itemIndex = cartItems.findIndex(item => item.productId === productId);
  cartItems.splice(itemIndex, 1);

  // Save the updated cart items to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  renderCartItems();
}

// Call the renderCartItems function on page load
window.onload = renderCartItems;


// Get the "Place Order" button element
const placeOrderBtn = document.querySelector('.place-order-btn');

// Add event listener to the "Place Order" button
placeOrderBtn.addEventListener('click', function(event) {
  // Check if the cart is empty
  if (cartItems.length === 0) {
    // Display an error message or perform any other desired action
    console.log("Cart is empty. Cannot place order.");
    event.preventDefault(); // Prevent the default action of the button
    return;
  }

  // Loop through each cart item
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];

    // Get the selected shoe size for the current item
    const selectedSize = document.querySelector('.shoe-size' + i).value;

    // Update the shoe size for the current cart item
    cartItem.shoeSize = selectedSize;
  }

  // Save the updated cart items to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
});






