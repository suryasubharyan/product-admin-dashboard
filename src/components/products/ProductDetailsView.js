"use client";

import useProduct from "@/hooks/useProduct";
import ProductDetails from "./ProductDetails";
import ProductNotFound from "./ProductNotFound";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import ErrorState from "@/components/ui/ErrorState";

export default function ProductDetailsView({ id }) {
  const { product, isLoading, error, notFound, retry } = useProduct(id);

  if (notFound) return <ProductNotFound />;
  if (isLoading) return <ProductDetailsSkeleton />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return <ProductDetails product={product} />;
}
