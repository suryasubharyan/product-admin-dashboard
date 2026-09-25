import ProductTable from "./ProductTable";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <>
      <div className="hidden md:block">
        <ProductTable products={products} />
      </div>
      <div className="grid gap-3 md:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
