import ProductTable from "./ProductTable";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onDelete }) {
  return (
    <>
      <div className="hidden md:block">
        <ProductTable products={products} onDelete={onDelete} />
      </div>
      <div className="grid gap-3 md:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}
