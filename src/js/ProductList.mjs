import { renderListWithTemplate, applyDiscount } from "./utils.mjs";

function productCardTemplate(product) {
    //calculate the discounted price
    const discountedPrice = product.Discount
        ? applyDiscount(product.Price, product.Discount)
        : product.Price;
    return `<li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3>${product.Brand.Name}></h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card_price">$${discountedPrice}
            ${product.Discount ? `<span class="original-price">$${product.Price}</span>` : ""}
            </p>
      </a>
    </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
