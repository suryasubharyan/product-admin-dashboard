"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/productService";

export default function useCategories() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        getCategories()
          .then((data) => {
             if (!ignore) setCategories(data);
          })
          .catch((err) => {
            if (!ignore) setError(err.message);
          });

        return () => {
            ignore = true;
        };
    }, []);

    return { categories, error };
}