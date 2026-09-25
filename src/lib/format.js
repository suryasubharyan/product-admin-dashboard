const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function formatPrice(value) {
    return priceFormatter.format(value ?? 0);
}

export function formatRating(value) {
    return Number(value ?? 0).toFixed(1);
}

export function formatCategory(slug) {
    return (slug ?? "").replace(/-/g, " ");
}
