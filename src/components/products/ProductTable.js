import Link from "next/link";
import ProductThumb from "./ProductThumb";
import StockBadge from "./StockBadge";
import { formatPrice, formatRating } from "@/lib/format";

export default function ProductTable({ products }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 text-right font-medium">Price</th>
            <th className="px-4 py-3 text-right font-medium">Rating</th>
            <th className="px-4 py-3 text-right font-medium">Stock</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <ProductThumb src={product.thumbnail} alt={product.title} />
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium text-gray-900 hover:text-blue-600"
                  >
                    {product.title}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-3 capitalize text-gray-600">{product.category}</td>
              <td className="px-4 py-3 text-right text-gray-900">{formatPrice(product.price)}</td>
              <td className="px-4 py-3 text-right text-gray-700">★ {formatRating(product.rating)}</td>
              <td className="px-4 py-3 text-right">
                <StockBadge stock={product.stock} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
