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

function compareBy(field, order) {
  const direction = order === "desc" ? -1 : 1;
  return (a, b) => {
    const x = a[field];
    const y = b[field];
    if (typeof x === "string") return x.localeCompare(y) * direction;
    return (x - y) * direction;
  };
}

// Decides whether a locally added product should appear on the current page.
// Without a sort, new products are shown first on page 1.
// With a sort, a product is shown on the page whose value range it falls into.
function belongsOnPage(product, apiProducts, query, isLastPage) {
  if (!query.sortBy) return query.page === 1;
  if (apiProducts.length === 0) return isLastPage;

  const compare = compareBy(query.sortBy, query.order);
  const first = apiProducts[0];
  const last = apiProducts[apiProducts.length - 1];

  const afterStart = query.page === 1 || compare(product, first) >= 0;
  const beforeEnd = isLastPage || compare(product, last) <= 0;
  return afterStart && beforeEnd;
}

// Merges locally saved add/edit/delete changes into a page of API results.
export function applyLocalChanges(apiProducts, apiTotal, query) {
  const { products, deletedIds } = readChanges();

  const visible = apiProducts
    .filter((p) => !deletedIds.includes(p.id))
    .map((p) => products[p.id] ?? p);

  const removedCount = apiProducts.length - visible.length;
  const matching = Object.values(products).filter((p) => p.isLocal && matchesQuery(p, query));

  const isLastPage = query.page * query.limit >= apiTotal;
  const addedOnPage = matching.filter((p) => belongsOnPage(p, apiProducts, query, isLastPage));

  const pageProducts = [...addedOnPage, ...visible];
  if (query.sortBy) {
    pageProducts.sort(compareBy(query.sortBy, query.order));
  }

  return {
    products: pageProducts,
    total: Math.max(0, apiTotal - removedCount + matching.length),
  };
}
