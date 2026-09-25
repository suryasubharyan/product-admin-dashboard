import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-5xl font-bold text-gray-300">404</p>
      <h1 className="text-xl font-semibold text-gray-800">Product not found</h1>
      <p className="text-sm text-gray-500">
        The product you are looking for does not exist or was deleted.
      </p>
      <Link
        href="/products"
        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Back to products
      </Link>
    </div>
  );
}
