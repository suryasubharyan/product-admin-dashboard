"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useCategories from "@/hooks/useCategories";
import useProduct from "@/hooks/useProduct";
import ProductForm from "./ProductForm";
import ProductNotFound from "./ProductNotFound";
import Loader from "@/components/ui/Loader";
import ErrorState from "@/components/ui/ErrorState";
import { editProduct } from "@/lib/productActions";
import { toFormValues } from "@/lib/productValidation";

export default function EditProductView({ id }) {
  const router = useRouter();
  const { categories } = useCategories();
  const { product, isLoading, error, notFound, retry } = useProduct(id);

  if (notFound) return <ProductNotFound />;
  if (isLoading) return <Loader text="Loading product..." />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  async function handleSubmit(values) {
    const saved = await editProduct(product, values);
    router.push(`/products/${saved.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Link href={`/products/${product.id}`} className="text-sm text-blue-600 hover:underline">
        ← Back to product
      </Link>
      <h1 className="text-2xl font-semibold text-gray-800">Edit product</h1>
      <ProductForm
        initialValues={toFormValues(product)}
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </div>
  );
}
