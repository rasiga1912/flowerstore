// Load existing cart or create an empty one
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add to cart
function addToCart(product) {
  const existing = cartItems.find((item) => item.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("Cart after adding:", cartItems);

  alert(`${product.name} added to cart`);

}

// Adding event listeners to all buttons
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const product = {
        name: this.dataset.name,
        price: parseFloat(this.dataset.price),
        img: this.dataset.img,
      };
      addToCart(product);
    });
  });
});
