import Link from "next/link";
import ProductThumb from "./ProductThumb";
import StockBadge from "./StockBadge";
import { formatPrice, formatRating } from "@/lib/format";

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3">
      <ProductThumb src={product.thumbnail} alt={product.title} size={80} />
      <div className="min-w-0 flex-1 space-y-1">
        <Link
          href={`/products/${product.id}`}
          className="block truncate font-medium text-gray-900 hover:text-blue-600"
        >
          {product.title}
        </Link>
        <p className="text-xs capitalize text-gray-500">{product.category}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-900">{formatPrice(product.price)}</span>
          <span className="text-gray-600">★ {formatRating(product.rating)}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <StockBadge stock={product.stock} />
          <div className="flex gap-3 text-sm">
            <Link href={`/products/${product.id}/edit`} className="text-blue-600">
              Edit
            </Link>
            <button onClick={() => onDelete(product)} className="text-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
