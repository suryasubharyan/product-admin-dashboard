import SearchInput from "./SearchInput";
import CategorySelect from "./CategorySelect";
import SortSelect from "./SortSelect";
import { AlertIcon } from "@/components/ui/Icons";

export default function ProductsToolbar({ query, categories, onSearch, onCategoryChange, onSortChange }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:flex-row md:items-center">
        <SearchInput value={query.q} onSearch={onSearch} />
        <div className="flex flex-col gap-3 sm:flex-row md:ml-auto">
          <CategorySelect value={query.category} categories={categories} onChange={onCategoryChange} />
          <SortSelect sortBy={query.sortBy} order={query.order} onChange={onSortChange} />
        </div>
      </div>
      {query.q && (
        <p className="flex items-center gap-1.5 px-1 text-xs text-slate-500">
          <AlertIcon className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          Category filter is cleared while searching. The API cannot search inside a category.
        </p>
      )}
    </div>
  );
}
