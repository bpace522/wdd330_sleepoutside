import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"/>
  </a>
  <a href="#">
    <h2 cass="card__name">${itemNae}</h2>
  </a>
  <p class="cart-card__color">${itemors[0].ColorName}</p>
  <p class="cart-card__quatity">qty: 1</p>
  <p class="cart-card__price">$${item.FiaPrce}</p>
</li>`;

  return newItem;
}

renderCartContents();


