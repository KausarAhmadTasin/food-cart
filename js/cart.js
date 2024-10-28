let cart = JSON.parse(localStorage.getItem("cart")) || {};

// Wait for DOM content to load before setting up event listeners
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    if (cart[button.dataset.id]) {
      button.disabled = true;
      button.classList.add("bg-gray-500", "cursor-not-allowed");
    }

    button.addEventListener("click", addToCart);
  });

  updateCartCount();
  updateCartUI();
});

// Function to add item to the cart
function addToCart(event) {
  const button = event.target;
  const itemId = button.dataset.id;
  const itemName = button.dataset.name;
  const itemPrice = parseFloat(button.dataset.price);
  const itemImage = button.dataset.image;

  // Check if the item is not already in the cart
  if (!cart[itemId]) {
    cart[itemId] = {
      name: itemName,
      price: itemPrice,
      image: itemImage,
      quantity: 1,
    };

    button.disabled = true;
    button.classList.add("bg-gray-500", "cursor-not-allowed");
    saveCart();
    updateCartCount();
    updateCartUI();
  }
}

// Function to update the cart's item count
function updateCartCount() {
  const cartCount = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );
  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = cartCount;
  });
}

// Function to save cart to local storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update the cart in the sidebar
function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";

  // Loop through each item in the cart and display it in the sidebar
  let totalAmount = 0;
  Object.keys(cart).forEach((itemId) => {
    const item = cart[itemId];
    const itemTotalPrice = (item.price * item.quantity).toFixed(2);
    totalAmount += parseFloat(itemTotalPrice);

    const li = document.createElement("li");
    li.className =
      "flex border border-white justify-between items-center p-2 rounded-lg relative mb-4";
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded mr-4" />
      <div class="flex-grow">
        <span>${item.name} - $${itemTotalPrice}</span>
      </div>
      <div class="flex items-center">
        <button onclick="decreaseQuantity('${itemId}')" class="px-2">-</button>
        <span class="px-2">${item.quantity}</span>
        <button onclick="increaseQuantity('${itemId}')" class="px-2">+</button>
        <button onclick="removeItem('${itemId}')" class="ml-2 absolute -top-3 bg-white px-2 text-lg py-0 -right-2 text-orange-600 rounded-full">&times;</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = totalAmount.toFixed(2);
}

// Function to increase the quantity of an item in the cart
function increaseQuantity(itemId) {
  cart[itemId].quantity += 1;
  saveCart();
  updateCartCount();
  updateCartUI();
}

// Function to decrease the quantity of an item in the cart
function decreaseQuantity(itemId) {
  if (cart[itemId].quantity > 1) {
    cart[itemId].quantity -= 1;
  } else {
    delete cart[itemId];
  }
  saveCart();
  updateCartCount();
  updateCartUI();
}

// Function to remove an item from the cart
function removeItem(itemId) {
  delete cart[itemId];
  saveCart();
  updateCartCount();
  updateCartUI();

  // Re-enable the 'Add to Cart' button for the removed item
  const addButton = document.querySelector(`.add-to-cart[data-id="${itemId}"]`);
  if (addButton) {
    addButton.disabled = false;
    addButton.classList.remove("bg-gray-500", "cursor-not-allowed");
  }
}
