function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.size ? `${item.name} (размер ${item.size})` : item.name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Удалить";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    };

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
}

window.addEventListener("load", () => {
  const cartOverlay = document.getElementById("cartOverlay");
  const openCartBtn = document.getElementById("openCartBtn");
  const closeCartBtn = document.querySelector(".close-cart");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (openCartBtn && cartOverlay) {
    openCartBtn.addEventListener("click", () => {
      cartOverlay.classList.add("open");
    });
  }

  if (closeCartBtn && cartOverlay) {
    closeCartBtn.addEventListener("click", () => {
      cartOverlay.classList.remove("open");
    });
  }

  document.addEventListener("click", (e) => {
    const target = e.target;
    const cartContent = document.querySelector(".cart-content");

    if (
      cartOverlay &&
      cartOverlay.classList.contains("open") &&
      !cartContent.contains(target) &&
      !openCartBtn?.contains(target)
    ) {
      cartOverlay.classList.remove("open");
    }
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Переход к оплате (заглушка).");
      localStorage.removeItem("cart");
      renderCart();
      cartOverlay.classList.remove("open");
    });
  }

  renderCart();
});

function addToCart(name, size = null) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, size });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  alert(`Товар "${name}" добавлен в корзину${size ? ` (размер ${size})` : ''}`);
}
