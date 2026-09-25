"use client";

import { useCallback, useRef, useState } from "react";
import { removeProduct } from "@/lib/productActions";

export default function useDeleteProduct(onDeleted) {
  const [target, setTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const deletingRef = useRef(false);

  const requestDelete = useCallback((product) => {
    setTarget(product);
    setError("");
  }, []);

  const cancelDelete = useCallback(() => {
    if (!deletingRef.current) setTarget(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (deletingRef.current || !target) return;
    deletingRef.current = true;
    setIsDeleting(true);
    setError("");

    try {
      await removeProduct(target);
      setTarget(null);
      onDeleted();
    } catch (err) {
      setError(err.message);
    } finally {
      deletingRef.current = false;
      setIsDeleting(false);
    }
  }, [target, onDeleted]);

  return { target, isDeleting, error, requestDelete, cancelDelete, confirmDelete };
}
