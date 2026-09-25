"use client";

import { useCallback, useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import { isRequestCanceled } from "@/lib/axios";

export default function useProducts(query) {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        setError("");
        
        getProducts(query, { signal: controller.signal })
          .then((data) => {
            if (controller.signal.aborted) return;
            setProducts(data.products);
            setTotal(data.total);
            setIsLoading(false);
          })
          .catch((err) => {
            if (isRequestCanceled(err) || controller.signal.aborted) return;
            setError(err.message);
            setIsLoading(false);
          });
        
       return () => controller.abort();
    }, [query, reloadKey]);

    const retry = useCallback(() => setReloadKey((key) => key + 1), []);
    return { products, total, isLoading, error, retry };
}