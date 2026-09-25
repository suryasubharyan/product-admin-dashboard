"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useCategories from "@/hooks/useCategories";
import ProductForm from "./ProductForm";
import { createProduct } from "@/lib/productActions";

export default function CreateProductView() {
  const router = useRouter();
  const { categories } = useCategories();

  async function handleSubmit(values) {
    const product = await createProduct(values);
    router.push(`/products/${product.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Link href="/products" className="text-sm text-blue-600 hover:underline">
        ← Back to products
      </Link>
      <h1 className="text-2xl font-semibold text-gray-800">Add product</h1>
      <ProductForm categories={categories} onSubmit={handleSubmit} submitLabel="Create product" />
    </div>
  );
}
