class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    // ascending sort
    return savedCategories.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
    );
  }
  static saveCategory(categoryToSave) {
    const savedCategories = this.getAllCategories();

    const existedCategory = savedCategories.find(
      (c) => c.id === categoryToSave.id
    );
    if (existedCategory) {
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
    } else {
      categoryToSave.id = Date.now();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sortType = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("product")) || [];

    if (sortType === "oldest") {
      return savedProducts.sort((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
      );
    }
    // descending sort
    return savedProducts.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
    );
  }
  static saveProduct(productToSave) {
    const savedProducts = this.getAllProducts();

    const existedProduct = savedProducts.find((p) => p.id === productToSave.id);
    if (existedProduct) {
      existedProduct.title = productToSave.title;
      existedProduct.description = productToSave.description;
      existedProduct.quantity = productToSave.quantity;
    } else {
      productToSave.id = Date.now();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("product", JSON.stringify(savedProducts));
  }
  static deleteProduct(id) {
    const filteredProducts = this.getAllProducts().filter(
      (p) => p.id !== Number(id)
    );
    localStorage.setItem("product", JSON.stringify(filteredProducts));
  }
}
export default Storage;
