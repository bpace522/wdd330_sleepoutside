import { setLocalStorage, getLocalStorage, loadHeaderFooter, applyDiscount } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  updateCartTotal(cartItems);
}

function updateCartTotal(cartItems) {
  const total = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    total.classList.remove("hide");

    //calculate total using discounted price
    const newTotal = cartItems.reduce((sum, item) => {
      const discountedPrice = item.Discount ? applyDiscount(item.Price, item.Discount) : item.Price;
      return sum + discountedPrice;
    }, 0);

    document.querySelector(".cart-total").textContent = `Total: $${newTotal.toFixed(2)}`
  } else {
    total.classList.add("hide");
  }
}

function removeFromCart(productId) {
  let cart = getLocalStorage("so-cart") || [];

  const index = cart.findIndex(item => item.Id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }

  setLocalStorage("so-cart", cart);
  renderCartContents();
}

function cartItemTemplate(item) {
  const discountedPrice = item.Discount ? applyDiscount(item.Price, item.Discoount) : item.Price;

  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${discountedPrice}${item.Discount ? `<span class="original-price>$${item.Price}</span>` : ""}</p>
  <button class="removeFromCart" data-id="${item.Id}">X</button>
</li>
`;

}

renderCartContents();

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("removeFromCart")) {
    const productId = e.target.dataset.id;
    removeFromCart(productId)
  }
});