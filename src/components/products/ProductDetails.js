import Link from "next/link";
import ImageGallery from "./ImageGallery";
import ReviewList from "./ReviewList";
import StockBadge from "./StockBadge";
import BackLink from "@/components/ui/BackLink";
import { PencilIcon, StarIcon } from "@/components/ui/Icons";
import { badgeClass, primaryButtonClass } from "@/components/ui/styles";
import { formatCategory, formatPrice, formatRating } from "@/lib/format";

export default function ProductDetails({ product }) {
  const reviewCount = product.reviews?.length ?? 0;

  return (
    <div className="space-y-8">
      <BackLink href="/products">Back to products</BackLink>

      <div className="grid gap-8 lg:grid-cols-2">
        <ImageGallery images={product.images} title={product.title} />

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className={badgeClass}>{formatCategory(product.category)}</span>
              {product.brand && <span className="text-slate-500">{product.brand}</span>}
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{product.title}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <StarIcon className="h-4 w-4 text-amber-400" />
              <span className="font-medium text-slate-900">{formatRating(product.rating)}</span>
              <span aria-hidden="true">·</span>
              <span>
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold tabular-nums text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-sm font-medium text-emerald-700">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          <p className="leading-relaxed text-slate-600">{product.description}</p>

          <dl className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
            <div>
              <dt className="text-slate-500">Availability</dt>
              <dd className="mt-1">
                <StockBadge stock={product.stock} />
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Product ID</dt>
              <dd className="mt-1 font-medium text-slate-900">#{product.id}</dd>
            </div>
          </dl>

          <Link href={`/products/${product.id}/edit`} className={primaryButtonClass}>
            <PencilIcon />
            Edit product
          </Link>
        </div>
      </div>

      <ReviewList reviews={product.reviews} />
    </div>
  );
}
