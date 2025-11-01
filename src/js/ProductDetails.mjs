class Productdetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        const addToCart = document.getElementById('addToCart');
        if (addToCart) {
            addToCart.addEventListener('click', this.addProductToCart.bind(this));
        }

    }
    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }
    //Render Product Details
    renderProductDetails() {
        const productContainer = document.getElementById("productDetails");

        if (!productContainer) return;

    }
}
