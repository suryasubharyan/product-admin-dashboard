"use client";

import { useCallback, useEffect, useState } from "react";
import { loadProduct } from "@/lib/productActions";

function isValidId(id) {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
}

export default function useProduct(id) {
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState({
    requestKey: null,
    product: null,
    error: "",
    notFound: false,
  });

  const invalidId = !isValidId(id);
  const requestKey = `${id}|${reloadKey}`;

  useEffect(() => {
    if (invalidId) return;

    let ignore = false;

    loadProduct(id)
      .then((product) => {
        if (!ignore) setResult({ requestKey, product, error: "", notFound: false });
      })
      .catch((err) => {
        if (ignore) return;
        const notFound = err.status === 404 || err.status === 400;
        setResult({ requestKey, product: null, error: notFound ? "" : err.message, notFound });
      });

    return () => {
      ignore = true;
    };
  }, [id, invalidId, requestKey]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  if (invalidId) {
    return { product: null, isLoading: false, error: "", notFound: true, retry };
  }

  const isLoading = result.requestKey !== requestKey;

  return {
    product: isLoading ? null : result.product,
    isLoading,
    error: isLoading ? "" : result.error,
    notFound: !isLoading && result.notFound,
    retry,
  };
}
