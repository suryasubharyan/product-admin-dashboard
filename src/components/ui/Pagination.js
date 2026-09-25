import { getPageNumbers } from "@/lib/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const baseBtn =
  "inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-lg px-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";
const idleBtn = `${baseBtn} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40`;
const activeBtn = `${baseBtn} bg-emerald-600 text-white shadow-sm`;

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={idleBtn}
      >
        <ChevronLeftIcon />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={`ellipsis-${index}`} className="px-1.5 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={p === page ? activeBtn : idleBtn}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={idleBtn}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
