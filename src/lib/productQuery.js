export const PAGE_SIZES = [10, 20, 50];
export const DEFAULT_LIMIT = 10;
export const SORT_FIELDS = ["price", "rating", "title"];
export const SORT_ORDERS = ["asc", "desc"];

function toPositiveInt(value, fallback) {
    const num = Number(value);
    return Number.isInteger(num) && num > 0 ? num : fallback;
}

export function parseProductQuery(searchParams){
    const page = toPositiveInt(searchParams.get("page"), 1);

    const limitNum = Number(searchParams.get("limit"));
    const limit = PAGE_SIZES.includes(limitNum) ? limitNum : DEFAULT_LIMIT;

    const q = (searchParams.get("q") || "").trim();

    const category = q ? "" : (searchParams.get("category") || "").trim();

    const sortParam = searchParams.get("sortBy");
    const sortBy = SORT_FIELDS.includes(sortParam) ? sortParam : "";

    const orderParam = searchParams.get("order");
    const order = SORT_ORDERS.includes(orderParam) ? orderParam : "asc";

    return { page, limit, q, category, sortBy, order };
}

export function buildProductQueryString(query) {
    const params = new  URLSearchParams();

    if (query.page > 1) params.set("page", String(query.page));
    if (query.limit !== DEFAULT_LIMIT) params.set("limit", String(query.limit));
    if (query.q) params.set("q", query.q);
    if (query.category) params.set("category", query.category);
    if (query.sortBy) {
        params.set("sortBy", query.sortBy);
        params.set("order", query.order);
    }

    return params.toString();
}