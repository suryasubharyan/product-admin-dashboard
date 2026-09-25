const bar = "animate-pulse rounded bg-slate-200";

// Same shape as the details page, so nothing jumps when the product loads.
export default function ProductDetailsSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading product">
      <div className="h-9 w-44 animate-pulse rounded-full bg-slate-200" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-2xl bg-slate-200" />
        <div className="space-y-4">
          <div className={`${bar} h-5 w-24`} />
          <div className={`${bar} h-9 w-3/4`} />
          <div className={`${bar} h-4 w-40`} />
          <div className={`${bar} h-9 w-32`} />
          <div className="space-y-2 pt-2">
            <div className={`${bar} h-4 w-full`} />
            <div className={`${bar} h-4 w-5/6`} />
            <div className={`${bar} h-4 w-2/3`} />
          </div>
          <div className="h-20 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
      <span className="sr-only">Loading product...</span>
    </div>
  );
}
