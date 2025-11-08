import ProductData from "./ProductData.mjs";
import ProductList from ".ProductList.mjs"

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.path = `../json/${this.category}.json`;
    }
    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }
    async findProductById(id) {
        const products = await this.getData();
        return products.find((item) => item.Id === id);
    }
}
class ProductData {
    constructor(category) {
        this.category = category;
        this.path = `../json/${this.category}.json`;
    }
    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }
    async findProductById(id) {
        const products = await this.getData();
        return products.find((item) => item.Id === id);
    }
}
