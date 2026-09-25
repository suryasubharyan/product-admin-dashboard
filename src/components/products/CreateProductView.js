"use client";

import { useRouter } from "next/navigation";
import useCategories from "@/hooks/useCategories";
import ProductForm from "./ProductForm";
import BackLink from "@/components/ui/BackLink";
import { useToast } from "@/components/ui/Toast";
import { createProduct } from "@/lib/productActions";

export default function CreateProductView() {
  const router = useRouter();
  const { categories } = useCategories();
  const showToast = useToast();

  async function handleSubmit(values) {
    const product = await createProduct(values);
    showToast("Product created");
    router.push(`/products/${product.id}`);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <BackLink href="/products">Back to products</BackLink>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Add a new product</h1>
        <p className="mt-1 text-sm text-slate-500">Start with the basics. You can change anything later.</p>
      </div>
      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="Add product"
        cancelHref="/products"
      />
    </div>
  );
}
