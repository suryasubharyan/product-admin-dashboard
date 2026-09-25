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
import ProductListSkeleton from "./ProductListSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useToast } from "@/components/ui/Toast";
import { PlusIcon } from "@/components/ui/Icons";
import { primaryButtonClass } from "@/components/ui/styles";

export default function ProductsView() {
  const { query, updateQuery } = useProductQuery();
  const { products, total, isLoading, error, retry } = useProducts(query);
  const { categories } = useCategories();
  const showToast = useToast();

  const handleDeleted = useCallback(() => {
    retry();
    showToast("Product deleted");
  }, [retry, showToast]);

  const deletion = useDeleteProduct(handleDeleted);

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
    content = <ProductListSkeleton />;
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
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Products</h1>
            {!isLoading && !error && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 motion-safe:animate-fade-in">
                {total} {total === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Browse, search and manage your product catalog.
          </p>
        </div>
        <Link href="/products/new" className={primaryButtonClass}>
          <PlusIcon />
          Add product
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
