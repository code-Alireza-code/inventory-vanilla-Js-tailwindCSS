//# Inventory App (OOP paradigm)

import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";
import Storage from "./Storage.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductView.setApp();
  CategoryView.createCategoriesList();
  ProductView.createProductsList(Storage.getAllProducts());
});
