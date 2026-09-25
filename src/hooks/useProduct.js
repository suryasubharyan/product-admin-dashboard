"use client";

import { useCallback, useEffect, useState } from "react";
import { getProductById } from "@/services/productService";

function isValidId(id){
    return /^\d+$/.test(String(id)) && Number(id) > 0;
}

export default function useProduct(id) {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const invalidId = !isValidId(id);

    useEffect(() => {
        if (invalidId) return;

        let ignore = false;
        setIsLoading(true);
        setError("");
        setNotFound(false);

        getProductById(id)
          .then((data) => {
            if (ignore) return;
            setProduct(data);
            setIsLoading(false);
          })
          .catch((err) => {
            if (ignore) return;
            if (err.status === 404 || err.status === 400) {
                setNotFound(true);
            } else {
                setError(err.message);
            }
            setIsLoading(false);
          });

          return () => {
            ignore = true;
          };
    }, [id, invalidId, reloadKey]);

    const retry = useCallback(() => setReloadKey((key) => key + 1), []);

    return {
        product,
        isLoading: invalidId ? false : isLoading,
        error,
        notFound: invalidId || notFound,
        retry,
    };
}