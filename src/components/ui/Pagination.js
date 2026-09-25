import { getPageNumbers } from "@/lib/pagination";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);
  const baseBtn = "min-w-9 rounded border px-3 py-1.5 text-sm";

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={`${baseBtn} border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        Previous
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={
              p === page
                ? `${baseBtn} border-blue-600 bg-blue-600 text-white`
                : `${baseBtn} border-gray-300 bg-white text-gray-700 hover:bg-gray-100`
            }
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={`${baseBtn} border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        Next
      </button>
    </nav>
  );
}
