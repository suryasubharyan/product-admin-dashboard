export const EMPTY_PRODUCT_FORM = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
};

export function toFormValues(product) {
  return {
    title: product.title ?? "",
    description: product.description ?? "",
    category: product.category ?? "",
    brand: product.brand ?? "",
    price: String(product.price ?? ""),
    stock: String(product.stock ?? ""),
  };
}

// Returns a map of field -> error message. An empty object means the form is valid.
export function validateProduct(values) {
  const errors = {};

  const title = values.title.trim();
  if (!title) errors.title = "Title is required.";
  else if (title.length < 3) errors.title = "Title must be at least 3 characters.";
  else if (title.length > 100) errors.title = "Title must be under 100 characters.";

  if (values.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  if (!values.category) errors.category = "Please select a category.";

  const price = Number(values.price);
  if (String(values.price).trim() === "") errors.price = "Price is required.";
  else if (!Number.isFinite(price) || price <= 0) errors.price = "Price must be greater than 0.";

  const stock = Number(values.stock);
  if (String(values.stock).trim() === "") errors.stock = "Stock is required.";
  else if (!Number.isInteger(stock) || stock < 0) errors.stock = "Stock must be a whole number (0 or more).";

  return errors;
}

export function toProductPayload(values) {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    category: values.category,
    brand: values.brand.trim(),
    price: Number(values.price),
    stock: Number(values.stock),
  };
}
