import Link from "next/link";
import { ArrowLeftIcon, SearchIcon } from "@/components/ui/Icons";
import { primaryButtonClass } from "@/components/ui/styles";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <SearchIcon className="h-7 w-7" />
      </div>
      <p className="mt-6 text-sm font-semibold text-emerald-700">404</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Product not found</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        The product you are looking for does not exist or was deleted.
      </p>
      <Link href="/products" className={`${primaryButtonClass} mt-6`}>
        <ArrowLeftIcon />
        Back to products
      </Link>
    </div>
  );
}
