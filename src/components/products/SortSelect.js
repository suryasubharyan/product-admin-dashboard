const SORT_OPTIONS = [
  { value: "", label: "Default order" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "rating-asc", label: "Rating: Low to High" },
  { value: "title-asc", label: "Title: A to Z" },
  { value: "title-desc", label: "Title: Z to A" },
];

export default function SortSelect({ sortBy, order, onChange }) {
  const value = sortBy ? `${sortBy}-${order}` : "";

  function handleChange(e) {
    const [nextSortBy = "", nextOrder = "asc"] = e.target.value.split("-");
    onChange({ sortBy: nextSortBy, order: nextOrder });
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      aria-label="Sort products"
      className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
