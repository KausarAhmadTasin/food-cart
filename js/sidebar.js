// Get elements
const cartIcon = document.querySelector(".relative svg");
const cartSidebar = document.getElementById("cart-sidebar");
const closeButton = document.getElementById("close-sidebar");

// Toggle sidebar visibility
cartIcon.addEventListener("click", () => {
  cartSidebar.classList.toggle("translate-x-full");
});

closeButton.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
});
