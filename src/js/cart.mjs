import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Cart {
    constructor() {
        this.cartContainer = document.querySelector(".cart-list");
    }

    init() {
        this.renderCart();
    }

    renderCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        if (!this.cartContainer) {
            console.error("Cart container not found");
            return;
        }
        this.cartContainer.innerHTML = cartItems.map(item => `
        <li class="cart-item relative border rounded-lg p-4 bg-white shadow-sm">
        //Remove (x) icon
            <button class="remove-btn absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg"
                data-id="${item.Id}" aria-label="Remove item">&times;</button>

            <div class="flex items-center gap-3">
                <img src="${item.Image}" alt="${item.Name}" class="w-16 h-16 object-cover rounded">
                    <div>
                        <p class="font-medium">${item.Name}</p>
                        <p class="text-sm text-gray-600">$${item.FinalPrice}</p>
                    </div>
            </div>
        </li>`
        ).join('');

        //event listener for all remove buttons
        document.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                this.removeFromCart(btn.dataset.id);
            });
        });
    }
    removeFromCart(productId) {
        let cart = getLocalStorage("so-cart") || [];
        const updatedCart = cart.filter(item => item.Id != productId);
        setLocalStorage("so-cart", updatedCart)
        renderCart();
    }
}