import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const categoryForm = document.querySelector("#category-form");
const productCategoryListDom = document.querySelector("#product-category");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
const cancelAddCategoryBtn = document.querySelector("#cancel-add-category");

class CategoryView {
  constructor() {
    categoryForm.addEventListener("submit", (e) => this.addNewCategory(e));
    [toggleAddCategoryBtn, cancelAddCategoryBtn].forEach((btn) => {
      btn.addEventListener("click", this.toggleAddCategory);
    });
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;

    // check whether title and desc entered ?
    if (!title || !description) return null;

    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    // update select option
    this.createCategoriesList(this.categories);
    categoryDescription.value = "";
    categoryTitle.value = "";
    this.toggleAddCategory();
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `<option class="bg-slate-600 text-slate-300" value="">
    select a category
  </option>`;
    this.categories.forEach((category) => {
      result += `<option class="bg-slate-600 text-slate-300" value="${category.id}">
      ${category.title}
    </option>`;
    });
    productCategoryListDom.innerHTML = result;
  }
  toggleAddCategory() {
    categoryWrapper.classList.toggle("hidden");
    toggleAddCategoryBtn.classList.toggle("hidden");
  }
}
export default new CategoryView();
