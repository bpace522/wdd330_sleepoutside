import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
function renderCheckoutTotal() {
    const cartItems = getLocalStorage("so-cart") || [];
    const totalContainer = document.querySelector(".checkout-total")

    if (!totalContainer) return;

    const total = cartItems.reduce((sum, item) => {
        const discountedPrice = item.Discount ? applyDiscount(item.Price, item.Discount) : item.Price;
        return sum + discountedPrice;
    }, 0);

    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}
renderCheckoutTotal();