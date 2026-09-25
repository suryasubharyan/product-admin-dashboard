"use client";

import useProduct from "@/hooks/useProduct";
import ProductDetails from "./ProductDetails";
import ProductNotFound from "./ProductNotFound";
import Loader from "@/components/ui/Loader";
import ErrorState from "@/components/ui/ErrorState";

export default function ProductDetailsView({ id }) {
  const { product, isLoading, error, notFound, retry } = useProduct(id);

  if (notFound) return <ProductNotFound />;
  if (isLoading) return <Loader text="Loading product..." />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return <ProductDetails product={product} />;
}
