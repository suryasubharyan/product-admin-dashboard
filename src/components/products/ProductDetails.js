import Link from "next/link";
import ImageGallery from "./ImageGallery";
import ReviewList from "./ReviewList";
import StockBadge from "./StockBadge";
import { formatPrice, formatRating } from "@/lib/format";

export default function ProductDetails({ product }) {
  return (
    <div className="space-y-8">
      <Link href="/products" className="text-sm text-blue-600 hover:underline">
        ← Back to products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <ImageGallery images={product.images} title={product.title} />

        <div className="space-y-4">
          <div>
            <p className="text-sm capitalize text-gray-500">
              {product.category}
              {product.brand ? ` · ${product.brand}` : ""}
            </p>
            <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm font-medium text-green-700">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <span>★ {formatRating(product.rating)}</span>
            <StockBadge stock={product.stock} />
          </div>

          <p className="leading-relaxed text-gray-700">{product.description}</p>
        </div>
      </div>

      <ReviewList reviews={product.reviews} />
    </div>
  );
}
