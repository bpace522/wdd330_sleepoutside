import { getLocalStorage, setLocalStorage } from ".utils.mjs";

export function renderCart() {
    const cartContainer = document.querySelector(".cart-list");
    const cartItems = getLocalStorage("so-cart") || [];

    if (!cartContainer) return;

    cartContainer.innerHTML = cartItems.map(item =>
        <li class="cart-item relative border rounded-lg p-4 bg-white shadow-sm">
        //Remove (x) icon
            <button class="remove-btn absolute top-2 righ-2 text-gray-400 hover:text-red-500 text-lg"
                data-id="${item.Id}" aria-label="Remove item">&times;</button>

            <div class="flex items-center gap-3">
                <img src="${item.Image}" alt="${item.Name}" class="w=16 h=16 object-cover rounded">
                    <div>
                        <p class="font-medium">${item.Name}</p>
                        <p class="text-sm text-gray-600">$${item.FinalPrice}</p>
                    </div>
                </img>
            </div>
        </li>
    ).join('');

    //event listener for all remove buttons
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            removeFromCart(btn.dataset.id);
        });
    });

}

export function removeFromCart(productId) {
    let cart = getLocalStorage("so-cart") || [];
    const updatedCart = cart.filter(item => item.Id != productId);
    setLocalStorage("so-cart", updatedCart)
    renderCart();
}