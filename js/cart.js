window.onload = function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cartContainer');
  const subtotalEl = document.getElementById('subtotal');
  const deliveryCharge = 50;
  const totalEl = document.getElementById('totalAmount');
  const dateEl = document.getElementById('expectedDate');

  if (cart.length === 0) {
    container.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'col-md-6 mb-3';
    row.innerHTML = `
      <div class="card p-3">
        <div class="d-flex align-items-center">
          <img src="${item.img}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover;" class="me-3">
          <div class="flex-grow-1">
            <h5>${item.name}</h5>
            <p>Price: ₹${item.price}</p>
            <div class="d-flex align-items-center">
              <label class="me-2">Qty:</label>
              <input type="number" min="1" value="${item.qty}" data-index="${index}" class="form-control qty-input" style="width: 60px;">
              <button class="btn btn-outline-danger btn-sm ms-3 remove-btn" data-index="${index}">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(row);
    subtotal += item.price * item.qty;
  });

  subtotalEl.textContent = subtotal;
  totalEl.textContent = subtotal + deliveryCharge;

  const expected = new Date();
  expected.setDate(expected.getDate() + 3);
  dateEl.textContent = expected.toDateString();

  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', function () {
      const index = this.dataset.index;
      const newQty = parseInt(this.value);
      cart[index].qty = newQty;
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = this.dataset.index;
      const removed = cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));

      // Unhighlight the cart icon in shop page (if applicable)
      const highlighted = JSON.parse(localStorage.getItem('cartHighlights')) || [];
      const updated = highlighted.filter(i => i.name !== removed[0].name);
      localStorage.setItem('cartHighlights', JSON.stringify(updated));

      location.reload();
    });
  });
};
