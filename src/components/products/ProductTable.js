import Link from "next/link";
import ProductThumb from "./ProductThumb";
import StockBadge from "./StockBadge";
import ProductActions from "./ProductActions";
import { StarIcon } from "@/components/ui/Icons";
import { badgeClass } from "@/components/ui/styles";
import { formatCategory, formatPrice, formatRating } from "@/lib/format";

const th = "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500";

export default function ProductTable({ products, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50/80">
          <tr className="text-left">
            <th className={th}>Product</th>
            <th className={`${th} w-44`}>Category</th>
            <th className={`${th} w-28 text-right`}>Price</th>
            <th className={`${th} w-24 text-center`}>Rating</th>
            <th className={`${th} w-40`}>Stock</th>
            <th className={`${th} w-32 text-right`}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product, index) => (
            <tr
              key={product.id}
              style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
              className="group transition-colors hover:bg-emerald-50/40 motion-safe:animate-fade-in-up"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <ProductThumb src={product.thumbnail} alt={product.title} size={44} />
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium text-slate-900 transition-colors group-hover:text-emerald-700"
                  >
                    {product.title}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={badgeClass}>{formatCategory(product.category)}</span>
              </td>
              <td className="px-4 py-3 text-right font-semibold tabular-nums text-slate-900">
                {formatPrice(product.price)}
              </td>
              <td className="px-4 py-3 text-center tabular-nums text-slate-700">
                <span className="inline-flex items-center gap-1">
                  <StarIcon className="h-4 w-4 text-amber-400" />
                  {formatRating(product.rating)}
                </span>
              </td>
              <td className="px-4 py-3">
                <StockBadge stock={product.stock} />
              </td>
              <td className="px-4 py-3 text-right">
                <ProductActions product={product} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
