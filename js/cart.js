let cart = {};

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
  console.log("Event listeners added to 'Add to Cart' buttons");
});

// Add to Cart function
function addToCart(event) {
  const button = event.target;
  const itemId = button.dataset.id;
  const itemName = button.dataset.name;
  const itemPrice = parseFloat(button.dataset.price);

  // Add item to cart if not already added
  if (!cart[itemId]) {
    cart[itemId] = {
      name: itemName,
      price: itemPrice,
      quantity: 1,
    };
    button.disabled = true; // Disable button to prevent duplicate addition
    button.classList.add("bg-gray-500", "cursor-not-allowed");
    console.log(`Added ${itemName} to cart`);
    updateCartUI();
  }
}

// Update cart sidebar and cart count
function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = ""; // Clear current items

  // Populate cart with items
  Object.keys(cart).forEach((itemId) => {
    const item = cart[itemId];
    const li = document.createElement("li");
    li.className = "flex justify-between items-center mb-2";
    li.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <div class="flex items-center">
                <button onclick="decreaseQuantity('${itemId}')" class="px-2">-</button>
                <span class="px-2">${item.quantity}</span>
                <button onclick="increaseQuantity('${itemId}')" class="px-2">+</button>
                <button onclick="removeItem('${itemId}')" class="ml-4 text-red-500">Remove</button>
            </div>
        `;
    cartItems.appendChild(li);
  });

  // Update total price and item count
  updateTotal();
  updateCartCount();
}

// Increase quantity
function increaseQuantity(itemId) {
  cart[itemId].quantity++;
  console.log(
    `Increased quantity of ${cart[itemId].name} to ${cart[itemId].quantity}`
  );
  updateCartUI();
}

// Decrease quantity
function decreaseQuantity(itemId) {
  if (cart[itemId].quantity > 1) {
    cart[itemId].quantity--;
  } else {
    delete cart[itemId];
    document.querySelector(`[data-id="${itemId}"]`).disabled = false; // Re-enable button
    document
      .querySelector(`[data-id="${itemId}"]`)
      .classList.remove("bg-gray-500", "cursor-not-allowed");
  }
  console.log(`Decreased quantity or removed ${itemId} from cart`);
  updateCartUI();
}

// Remove item from cart
function removeItem(itemId) {
  delete cart[itemId];
  document.querySelector(`[data-id="${itemId}"]`).disabled = false; // Re-enable button
  document
    .querySelector(`[data-id="${itemId}"]`)
    .classList.remove("bg-gray-500", "cursor-not-allowed");
  console.log(`Removed ${itemId} from cart`);
  updateCartUI();
}

// Update total price
function updateTotal() {
  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Update cart count in navbar
function updateCartCount() {
  const itemCount = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  document.getElementById("cart-count").textContent = itemCount;
  console.log(`Cart count updated to ${itemCount}`);
}
