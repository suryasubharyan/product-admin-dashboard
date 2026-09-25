import StockBadge from "./StockBadge";
import { ImageIcon } from "@/components/ui/Icons";
import { badgeClass } from "@/components/ui/styles";
import { formatCategory, formatPrice } from "@/lib/format";

export default function ProductPreview({ values, thumbnail }) {
  const price = Number(values.price);
  const stock = Number(values.stock);
  const hasStock = values.stock !== "" && Number.isInteger(stock) && stock >= 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live preview</p>
      <p className="mt-1 text-xs text-slate-400">How it will look in the product list.</p>

      <div className="mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-slate-50 text-slate-300 ring-1 ring-slate-200">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt="" className="h-full w-full object-contain p-4" />
        ) : (
          <ImageIcon className="h-10 w-10" />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {values.category ? (
          <span className={badgeClass}>{formatCategory(values.category)}</span>
        ) : (
          <span className="inline-block h-5 w-20 rounded-md bg-slate-100" />
        )}
        <p className={`line-clamp-2 font-medium ${values.title.trim() ? "text-slate-900" : "text-slate-300"}`}>
          {values.title.trim() || "Product title"}
        </p>
        {values.brand.trim() && <p className="text-xs text-slate-500">by {values.brand.trim()}</p>}
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-semibold tabular-nums text-slate-900">
            {Number.isFinite(price) && price > 0 ? formatPrice(price) : "$0.00"}
          </span>
          {hasStock && <StockBadge stock={stock} />}
        </div>
      </div>
    </div>
  );
}
