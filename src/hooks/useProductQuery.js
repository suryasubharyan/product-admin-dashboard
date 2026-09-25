"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParamas } from "next/navigation";
import { parseProductQuery, buildProductQueryString } from "@/lib/productQuery";

const RESET_PAGE_KEYS = ["q", "category", "sortBy", "order", "limit"];

export default function useProductQuery() {
    const searchParams = useSearchParamas();
    const router = useRouter();
    const pathname = usePathname();

    const query = useMemo(() => parseProductQuery(searchParams), [searchParams]);

    const updateQuery = useCallback(
        (changes, { replace = false} = {}) => {
            const next = { ...query, ...changes};

            if (changes.q) next.category = "";
            if (changes.category) next.q = "";

            const shouldResetPage = RESET_PAGE_KEYS.some((key) => key in changes) && !("page" in changes);
            if (shouldResetPage) next.page = 1;

            const qs = buildProductQueryString(next);
            const url = qs ? `${pathname}?${qs}` : pathname;

            if (replace) {
                router.replace(url, {scroll: false});
            } else {
                router.push(url, { scroll: false});
            }
        },
        [query, pathname, router]
    );
    return { query, updateQuery };
}