"use client";

import { useEffect } from "react";
import useProductQuery from "@/hooks/useProductQuery";
import useProducts from "@/hooks/useProducts";
import ProductList from "./ProductList";
import ProductsFooter from "./ProductsFooter";
import Loader from "@/components/ui/Loader";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

export default function ProductsView() {
  const { query, updateQuery } = useProductQuery();
  const { products, total, isLoading, error, retry } = useProducts(query);

  const totalPages = Math.max(1, Math.ceil(total / query.limit));

  // ?page=999 jaise out-of-range page ko aakhri valid page par le jao
  useEffect(() => {
    if (!isLoading && !error && query.page > totalPages) {
      updateQuery({ page: totalPages }, { replace: true });
    }
  }, [isLoading, error, query.page, totalPages, updateQuery]);

  let content;
  if (isLoading) {
    content = <Loader text="Loading products..." />;
  } else if (error) {
    content = <ErrorState message={error} onRetry={retry} />;
  } else if (products.length === 0) {
    content = <EmptyState description="Try a different search or filter." />;
  } else {
    content = (
      <>
        <ProductList products={products} />
        <ProductsFooter
          page={query.page}
          limit={query.limit}
          total={total}
          totalPages={totalPages}
          onPageChange={(page) => updateQuery({ page })}
          onLimitChange={(limit) => updateQuery({ limit })}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
      {content}
    </div>
  );
}
