const bar = "animate-pulse rounded bg-slate-200";
const FIELDS = [0, 1, 2, 3];

// Same shape as the edit page, so nothing jumps when the real form appears.
export default function ProductFormSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-6" role="status" aria-label="Loading product">
      <div className="h-9 w-40 animate-pulse rounded-full bg-slate-200" />
      <div className="space-y-2">
        <div className={`${bar} h-7 w-48`} />
        <div className={`${bar} h-4 w-80 max-w-full`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {FIELDS.map((field) => (
            <div key={field} className="space-y-2">
              <div className={`${bar} h-4 w-24`} />
              <div className={`${bar} h-10 w-full rounded-lg`} />
            </div>
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-xl border border-slate-200 bg-white" />
      </div>
      <span className="sr-only">Loading product...</span>
    </div>
  );
}
