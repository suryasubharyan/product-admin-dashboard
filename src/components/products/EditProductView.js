"use client";

import { useRouter } from "next/navigation";
import useCategories from "@/hooks/useCategories";
import useProduct from "@/hooks/useProduct";
import ProductForm from "./ProductForm";
import ProductNotFound from "./ProductNotFound";
import ProductFormSkeleton from "./ProductFormSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import BackLink from "@/components/ui/BackLink";
import { useToast } from "@/components/ui/Toast";
import { editProduct } from "@/lib/productActions";
import { toFormValues } from "@/lib/productValidation";

export default function EditProductView({ id }) {
  const router = useRouter();
  const { categories } = useCategories();
  const { product, isLoading, error, notFound, retry } = useProduct(id);
  const showToast = useToast();

  if (notFound) return <ProductNotFound />;
  if (isLoading) return <ProductFormSkeleton />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  async function handleSubmit(values) {
    const saved = await editProduct(product, values);
    showToast("Changes saved");
    router.push(`/products/${saved.id}`);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <BackLink href={`/products/${product.id}`}>Back to product</BackLink>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Edit product</h1>
        <p className="mt-1 text-sm text-slate-500">Editing <span className="font-medium text-slate-700">{product.title}</span>. Changes show up in the list as soon as you save.</p>
      </div>
      <ProductForm
        initialValues={toFormValues(product)}
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        cancelHref={`/products/${product.id}`}
        thumbnail={product.thumbnail}
      />
    </div>
  );
}
