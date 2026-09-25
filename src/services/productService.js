import api from "@/lib/axios";

const LIST_FIELDS = "title,price,rating,category,thumbnail,stock";

// Optional artificial delay (ms) for testing slow responses and race conditions.
const API_DELAY = process.env.NEXT_PUBLIC_API_DELAY;

export async function getProducts(query, { signal } = {}) {
    const { page, limit, q, category, sortBy, order } = query;

    const params = {
        limit, 
        skip: (page - 1) * limit,
        select: LIST_FIELDS,
    };

    if (sortBy) {
        params.sortBy = sortBy;
        params.order = order;
    }

    if (API_DELAY) {
        params.delay = API_DELAY;
    }

    let url = "/products";
    if (q){
        url = "/products/search";
        params.q = q;
    } else if (category) {
        url = `/products/category/${encodeURIComponent(category)}`;
    }

    const { data } = await api.get(url, { params, signal });
    return data;
}

export async function getCategories() {
    const { data } = await api.get("/products/categories");
    return data;
}

export async function getProductById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data;
}

export async function addProduct(product) {
    const { data } = await api.post("/products/add", product);
    return data;
}

export async function updateProduct(id, product) {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
}


export async function deleteProduct(id) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
}