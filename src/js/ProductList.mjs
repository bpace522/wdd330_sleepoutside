import { renderListWithTemplate } from "./util.mjs"
function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.id}">
          <img src="${product.image}" alt+"Image of ${product.name}">
          <h2 class="card_brand">${product.brand}</h3>
          <p class="product-card__price">$${product.price}</p>
          </>
        <i/li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        //You passed in this information to make the class as possible.
        //Being able to define these things when you use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // the dataSource will return a Promise... so you can use await to resolve it.
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        //const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join('')) ;
        renderListWithTemplate(productCardTemplate.this.listElement, list);
    }
}