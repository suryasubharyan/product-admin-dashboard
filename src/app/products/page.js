import { Suspense } from "react";
import ProductsView from "@/components/products/ProductsView";
import Loader from "@/components/ui/Loader";

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ProductsView />
    </Suspense>
  );
}
