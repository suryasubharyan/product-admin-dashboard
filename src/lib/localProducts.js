const STORAGE_KEY = "local_product_changes";

function readChanges() {
  if (typeof window === "undefined") return { products: {}, deletedIds: [] };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      products: parsed?.products ?? {},
      deletedIds: parsed?.deletedIds ?? [],
    };
  } catch {
    return { products: {}, deletedIds: [] };
  }
}

function writeChanges(changes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(changes));
}

export function saveLocalProduct(product) {
  const changes = readChanges();
  changes.products[product.id] = product;
  writeChanges(changes);
}

export function markProductDeleted(product) {
  const changes = readChanges();
  delete changes.products[product.id];
  if (!product.isLocal && !changes.deletedIds.includes(product.id)) {
    changes.deletedIds.push(product.id);
  }
  writeChanges(changes);
}

export function getLocalProduct(id) {
  const { products, deletedIds } = readChanges();
  const numId = Number(id);
  if (deletedIds.includes(numId)) return { deleted: true, product: null };
  return { deleted: false, product: products[numId] ?? null };
}

function matchesQuery(product, query) {
  if (query.q) return product.title.toLowerCase().includes(query.q.toLowerCase());
  if (query.category) return product.category === query.category;
  return true;
}

// Merges locally saved add/edit/delete changes into a page of API results.
export function applyLocalChanges(apiProducts, apiTotal, query) {
  const { products, deletedIds } = readChanges();

  const visible = apiProducts
    .filter((p) => !deletedIds.includes(p.id))
    .map((p) => products[p.id] ?? p);

  const removedCount = apiProducts.length - visible.length;
  const added = Object.values(products).filter((p) => p.isLocal && matchesQuery(p, query));

  return {
    products: query.page === 1 ? [...added, ...visible] : visible,
    total: Math.max(0, apiTotal - removedCount + added.length),
  };
}
