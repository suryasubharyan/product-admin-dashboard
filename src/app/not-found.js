import Link from "next/link";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { primaryButtonClass } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold text-emerald-700">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500">The page you are looking for does not exist.</p>
      <Link href="/products" className={`${primaryButtonClass} mt-6`}>
        <ArrowLeftIcon />
        Go to products
      </Link>
    </main>
  );
}
