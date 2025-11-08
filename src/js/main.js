import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productList = new ProductList("Tents", dataSource, element);
const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

productList.init();