export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
        this.calculateItemSubTotal();
        this.calculateOrderTotal
    }

    calculateItemSubTotal() {
        //calculate and display the total dollar amount of the items
        this.itemTotal = this.list.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const subTotal = document.querySelector(`${this.outputSelector} #subTotal`);
        subTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        //calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        const taxRate = 0.06

        const totalItems = this.list.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems <= 0) {
            this.shipping = 0
        } else {
            const firstItemShipping = 10.00;
            const additionalItemShipping = 2.00;
            this.shipping = firstItemShipping + ((totalItems - 1) * additionalItemShipping);
        }
        this.tax = this.itemTotal * taxRate

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the total are all calculated display them in the summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);

        tax.innerText = `$${this.tax.toFixed(2)}`;

        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        shipping.innerText = `$${this.orderTotal.toFixed(2)}`;

        const total = document.querySelector(`${this.outputSelector} #total`);
        total.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
}