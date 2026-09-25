"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import useProductQuery from "@/hooks/useProductQuery";
import useProducts from "@/hooks/useProducts";
import useCategories from "@/hooks/useCategories";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import ProductsToolbar from "./ProductsToolbar";
import ProductList from "./ProductList";
import ProductsFooter from "./ProductsFooter";
import Loader from "@/components/ui/Loader";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function ProductsView() {
  const { query, updateQuery } = useProductQuery();
  const { products, total, isLoading, error, retry } = useProducts(query);
  const { categories } = useCategories();
  const deletion = useDeleteProduct(retry);

  const totalPages = Math.max(1, Math.ceil(total / query.limit));

  // Clamp out-of-range pages (e.g. ?page=999) to the last valid page.
  useEffect(() => {
    if (!isLoading && !error && query.page > totalPages) {
      updateQuery({ page: totalPages }, { replace: true });
    }
  }, [isLoading, error, query.page, totalPages, updateQuery]);

  const handleSearch = useCallback(
    (q) => updateQuery({ q }, { replace: true }),
    [updateQuery]
  );

  let content;
  if (isLoading) {
    content = <Loader text="Loading products..." />;
  } else if (error) {
    content = <ErrorState message={error} onRetry={retry} />;
  } else if (products.length === 0) {
    content = (
      <EmptyState
        description={
          query.q ? `No results for "${query.q}". Try another word.` : "Try a different filter."
        }
      />
    );
  } else {
    content = (
      <>
        <ProductList products={products} onDelete={deletion.requestDelete} />
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <Link
          href="/products/new"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add product
        </Link>
      </div>

      <ProductsToolbar
        query={query}
        categories={categories}
        onSearch={handleSearch}
        onCategoryChange={(category) => updateQuery({ category })}
        onSortChange={({ sortBy, order }) => updateQuery({ sortBy, order })}
      />

      {content}

      <ConfirmModal
        open={Boolean(deletion.target)}
        title="Delete product?"
        message={`"${deletion.target?.title}" will be removed. This cannot be undone.`}
        confirmLabel="Delete"
        loadingLabel="Deleting..."
        isLoading={deletion.isDeleting}
        error={deletion.error}
        onConfirm={deletion.confirmDelete}
        onCancel={deletion.cancelDelete}
      />
    </div>
  );
}
