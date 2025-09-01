// Helper function: load wishlist from localStorage
function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Toggle heart icon and add/remove product
function addToWishlist(el, name, image, price) {
  const wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.name === name);

  const heartIcon = el.querySelector("i");

  if (index !== -1) {
    // Remove from wishlist
    wishlist.splice(index, 1);
    heartIcon.classList.remove("fas", "text-danger");
    heartIcon.classList.add("far");
  } else {
    // Add to wishlist
    wishlist.push({ name, image, price });
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas", "text-danger");
  }

  saveWishlist(wishlist);
}

// Load wishlist items in wishlist.html
function renderWishlist() {
  const wishlist = getWishlist();
  const container = document.getElementById("wishlist-items");

  if (!container) return;

  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = "<p class='text-center'>No items in your wishlist.</p>";
    return;
  }

  wishlist.forEach((item, index) => {
  const product = document.createElement("div");
  product.className = "col";

  product.innerHTML = `
    <div class="card h-100">
      <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h6 class="card-title mb-0">${item.name}</h6>
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${index})">Remove</button>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-auto">
          <p class="card-text mb-0">₹${item.price}</p>
          <button class="btn btn-sm btn-outline-primary" onclick="addToCart(null, '${item.name}', '${item.image}', ${item.price})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  container.appendChild(product);
});


}

// Remove item from wishlist
function removeFromWishlist(index) {
  const wishlist = getWishlist();
  wishlist.splice(index, 1);
  saveWishlist(wishlist);
  renderWishlist();
}

// Run on wishlist page
document.addEventListener("DOMContentLoaded", renderWishlist);
