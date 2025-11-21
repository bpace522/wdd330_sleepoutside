import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;


loadHeaderFooter();
console.log("BASE URL:", baseURL);

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    console.log("Checkout payload:", order);
    e.preventDefault();
    order.checkout();
});