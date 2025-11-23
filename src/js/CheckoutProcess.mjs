import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function packageItems(items) {
  const counts = {};

  items.forEach(item => {
    counts[item.Id] = (counts[item.Id] || 0) + 1;
  });

  return Object.keys(counts).map(id => ({
    id: id,
    qty: counts[id]
  }));
}


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
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.length;
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = (this.itemTotal * .06);
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.tax) +
      parseFloat(this.shipping)
    )
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
        const formElement = document.forms["checkout"];
        const data = formDataToJSON(formElement);

        const order = {
            orderDate: new Date().toISOString(),
            fname: data.fname,
            lname: data.lname,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
            cardNumber: data.cardNumber,
            expiration: data.expiration,
            code: data.code,
            items: this.list.map(item => ({
                id: item.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: 1
            })),
            orderTotal: parseFloat(this.orderTotal.toFixed(2)),
            shipping: parseFloat(this.shipping.toFixed(2)),
            tax: parseFloat(this.tax.toFixed(2))
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        };

        try {
            const response = await fetch("https://wdd330-backend.onrender.com/checkout", options);
            const result = await response.json();
            console.log("Checkout success:", result);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");
        } catch (err) {
            removeAllAlerts();
            for (let message in err.message) {
              alertMessage(err.message[message]);
            }
            console.log(err);
        }
    }
}