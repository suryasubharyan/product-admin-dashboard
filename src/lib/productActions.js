import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import {
  applyLocalChanges,
  getLocalProduct,
  saveLocalProduct,
  markProductDeleted,
} from "./localProducts";

export async function loadProducts(query, options) {
  const data = await getProducts(query, options);
  return applyLocalChanges(data.products, data.total, query);
}

export async function loadProduct(id) {
  const local = getLocalProduct(id);
  if (local.deleted) {
    throw { message: "Product not found.", status: 404 };
  }
  if (local.product) return local.product;
  return getProductById(id);
}

export async function createProduct(values) {
  const created = await addProduct(values);
  const product = {
    ...created,
    id: Date.now(), // The API always returns id 195, so generate a unique one
    isLocal: true,
    rating: 0,
    images: [],
    thumbnail: "",
    reviews: [],
  };
  saveLocalProduct(product);
  return product;
}

export async function editProduct(existing, values) {
  let saved = { ...existing, ...values };
  if (!existing.isLocal) {
    const response = await updateProduct(existing.id, values);
    saved = { ...existing, ...response };
  }
  saveLocalProduct(saved);
  return saved;
}

export async function removeProduct(product) {
  if (!product.isLocal) {
    await deleteProduct(product.id);
  }
  markProductDeleted(product);
}
