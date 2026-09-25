export function getPageNumbers(current, total) {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    if (start > 2) pages.push("...");
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < total - 1) pages.push("...");

    pages.push(total);
    return pages;
}


export function getPageRange(page, limit, total) {
    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);
    return { from, to};
}