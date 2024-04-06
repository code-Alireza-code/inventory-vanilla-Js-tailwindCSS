import Storage from "./Storage.js";

const productForm = document.querySelector("#product-form");
const productsDom = document.querySelector("#products-list");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");
const productsNumber = document.querySelector("#products-number");

class ProductView {
  constructor() {
    productForm.addEventListener("submit", (e) => {
      this.addNewProduct(e);
    });
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
    productsNumber.innerText = Storage.getAllProducts().length;
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }

  addNewProduct(e) {
    e.preventDefault();
    let title = document.querySelector("#product-title").value;
    let quantity = document.querySelector("#product-quantity").value;
    let category = document.querySelector("#product-category").value;

    if (!title || !category || !quantity) return null;

    Storage.saveProduct({ title, category, quantity });
    this.products = Storage.getAllProducts();
    this.createProductsList(Storage.getAllProducts());
    this.emptyProductForm();
  }
  createProductsList(productsList) {
    let result = "";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    productsDom.innerHTML = "";
    productsList.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += `<div class="flex items-center justify-between pb-2 border-b last:border-b-0 border-slate-600">

      <span class="text-slate-300">${item.title}</span>
      <div class="flex items-center gap-x-3">
        <span class="text-slate-400">${new Date(
          item.createdAt
        ).toLocaleDateString("fa-IR", options)}</span>
        <span
          class="block px-3 py-0.5 border border-slate-500 rounded-2xl
          text-slate-300  text-sm w-24 text-center"
          >${selectedCategory.title}</span
        >
        <span
          class="flex items-center justify-center w-7 h-7 rounded-full text-slate-300 bg-slate-500 border border-slate-300"
          >${item.quantity}</span
        >
        <button
          class="border px-2 py-0.5 rounded-2xl border-red-500 text-red-500 delete-product-btn" data-delete-id=${
            item.id
          }
        >
          delete
        </button>
      </div>
    </div>`;
    });
    productsDom.innerHTML = result;
    productsNumber.innerText = Storage.getAllProducts().length;
    const deleteBtns = document.querySelectorAll(".delete-product-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }
  emptyProductForm() {
    document.querySelector("#product-title").value = "";
    document.querySelector("#product-quantity").value = "";
    document.querySelector("#product-category").value = "";
  }
  searchProducts(e) {
    this.products = Storage.getAllProducts();
    const inputValue = e.target.value.trim().toLowerCase();
    const relatedItems = this.products.filter((p) =>
      p.title.toLowerCase().includes(inputValue)
    );
    this.products = relatedItems;
    this.createProductsList(this.products);
  }
  sortProducts(e) {
    const sortType = e.target.value;
    this.products = Storage.getAllProducts(sortType);
    this.createProductsList(this.products);
  }
  deleteProduct(e) {
    const deleteId = e.target.dataset.deleteId;
    Storage.deleteProduct(deleteId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}

export default new ProductView();
