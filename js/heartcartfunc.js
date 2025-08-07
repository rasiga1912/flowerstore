
 //  wishlist functionality //

window.addEventListener('DOMContentLoaded', () => {
  const highlights = JSON.parse(localStorage.getItem('cartHighlights')) || [];
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // For cart icon color
  document.querySelectorAll('.fa-shopping-cart').forEach(icon => {
    const cardTitle = icon.closest('.card').querySelector('.card-title')?.textContent?.trim();
    if (highlights.some(p => p.name === cardTitle)) {
      icon.style.color = 'gold';
    }
  });

  // For heart icon color
  document.querySelectorAll('.fa-heart').forEach(icon => {
    const card = icon.closest('.card');
    const cardTitle = card?.querySelector('.card-title')?.textContent?.trim();

    if (wishlist.some(item => item.name === cardTitle)) {
      icon.classList.remove('far');
      icon.classList.add('fas', 'text-danger');
    } else {
      icon.classList.remove('fas', 'text-danger');
      icon.classList.add('far');
    }
  });
});


 //  cart functionality //
function addToCart(el, name, img, price) {
  const item = { name, img, price, qty: 1 };
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const exists = cart.some(p => p.name === name);

  if (!exists) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to Cart!");

    // Color cart icon
    const icon = el.querySelector('i');
    icon.style.color = 'gold';

    // Track for re-highlighting on reload
    const highlights = JSON.parse(localStorage.getItem('cartHighlights')) || [];
    highlights.push({ name });
    localStorage.setItem('cartHighlights', JSON.stringify(highlights));
  } else {
    // Remove from cart
    const filtered = cart.filter(p => p.name !== name);
    localStorage.setItem('cart', JSON.stringify(filtered));
    alert("Removed from Cart!");

    const icon = el.querySelector('i');
    icon.style.color = ''; // reset

    // Remove from highlight
    const highlights = JSON.parse(localStorage.getItem('cartHighlights')) || [];
    const updated = highlights.filter(p => p.name !== name);
    localStorage.setItem('cartHighlights', JSON.stringify(updated));
  }
}

// To persist cart icon color on page reload
window.addEventListener('DOMContentLoaded', () => {
  const highlights = JSON.parse(localStorage.getItem('cartHighlights')) || [];
  document.querySelectorAll('.fa-shopping-cart').forEach(icon => {
    const cardTitle = icon.closest('.card').querySelector('.card-title').textContent.trim();
    if (highlights.some(p => p.name === cardTitle)) {
      icon.style.color = 'gold';
    }
  });
});
