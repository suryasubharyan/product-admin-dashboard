import Link from "next/link";
import { PencilIcon, TrashIcon } from "@/components/ui/Icons";

export default function ProductActions({ product, onDelete }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <Link
        href={`/products/${product.id}/edit`}
        aria-label={`Edit ${product.title}`}
        className="inline-flex h-8 items-center gap-1.5 px-2.5 text-xs font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
      >
        <PencilIcon className="h-3.5 w-3.5" />
        Edit
      </Link>
      <span className="h-5 w-px bg-slate-200" aria-hidden="true" />
      <button
        onClick={() => onDelete(product)}
        aria-label={`Delete ${product.title}`}
        title="Delete"
        className="inline-flex h-8 items-center px-2.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
      >
        <TrashIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
