import { SearchIcon } from "./Icons";

export default function EmptyState({ title = "No products found", description }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center motion-safe:animate-fade-in">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <SearchIcon className="h-6 w-6" />
      </div>
      <p className="mt-4 font-medium text-slate-900">{title}</p>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>
  );
}
