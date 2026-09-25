import SearchInput from "./SearchInput";
import CategorySelect from "./CategorySelect";
import SortSelect from "./SortSelect";

export default function ProductsToolbar({ query, categories, onSearch, onCategoryChange, onSortChange }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <SearchInput value={query.q} onSearch={onSearch} />
        <CategorySelect value={query.category} categories={categories} onChange={onCategoryChange} />
        <SortSelect sortBy={query.sortBy} order={query.order} onChange={onSortChange} />
      </div>
      {query.q && (
        <p className="text-xs text-gray-500">
          Category filter is cleared while searching. The API cannot search inside a category.
        </p>
      )}
    </div>
  );
}
