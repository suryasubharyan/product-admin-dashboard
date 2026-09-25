import ProductDetailsView from "@/components/products/ProductDetailsView";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  return <ProductDetailsView id={id} />;
}
