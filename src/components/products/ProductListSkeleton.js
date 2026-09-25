const ROWS = Array.from({ length: 6 }, (_, i) => i);

export default function ProductListSkeleton() {
  return (
    <div role="status" aria-label="Loading products">
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="h-11 border-b border-slate-200 bg-slate-50" />
        {ROWS.map((row) => (
          <div key={row} className="flex items-center gap-6 border-b border-slate-100 px-4 py-3 last:border-0">
            <div className="h-11 w-11 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-4 flex-1 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200" />
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:hidden">
        {ROWS.map((row) => (
          <div key={row} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <div className="h-20 w-20 animate-pulse rounded-lg bg-slate-200" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading products...</span>
    </div>
  );
}
