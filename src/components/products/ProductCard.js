import Link from "next/link";
import ProductThumb from "./ProductThumb";
import StockBadge from "./StockBadge";
import ProductActions from "./ProductActions";
import { StarIcon } from "@/components/ui/Icons";
import { formatCategory, formatPrice, formatRating } from "@/lib/format";

export default function ProductCard({ product, onDelete, index = 0 }) {
  return (
    <div
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-safe:animate-fade-in-up"
    >
      <ProductThumb src={product.thumbnail} alt={product.title} size={80} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.id}`}
            className="line-clamp-2 font-medium text-slate-900 hover:text-emerald-700"
          >
            {product.title}
          </Link>
          <span className="shrink-0 font-semibold tabular-nums text-slate-900">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          <span className="capitalize">{formatCategory(product.category)}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-0.5">
            <StarIcon className="h-3.5 w-3.5 text-amber-400" />
            {formatRating(product.rating)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <StockBadge stock={product.stock} />
          <ProductActions product={product} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}
