"use client";

import { useCallback, useEffect, useState } from "react";
import { loadProducts } from "@/lib/productActions";
import { isRequestCanceled } from "@/lib/axios";

export default function useProducts(query) {
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState({
    requestKey: null,
    products: [],
    total: 0,
    error: "",
  });

  // Identifies the current request; a result with a different key is stale.
  const requestKey = `${JSON.stringify(query)}|${reloadKey}`;

  useEffect(() => {
    const controller = new AbortController();

    loadProducts(query, { signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        setResult({ requestKey, products: data.products, total: data.total, error: "" });
      })
      .catch((err) => {
        if (isRequestCanceled(err) || controller.signal.aborted) return;
        setResult({ requestKey, products: [], total: 0, error: err.message });
      });

    // Cancel the previous request so old responses never overwrite new ones.
    return () => controller.abort();
  }, [query, requestKey]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  const isLoading = result.requestKey !== requestKey;

  return {
    products: result.products,
    total: result.total,
    isLoading,
    error: isLoading ? "" : result.error,
    retry,
  };
}
