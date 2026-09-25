export default function CategorySelect({ value, categories, onChange }) {
    return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Filter by category"
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
                {category.name}
            </option>
          ))}
        </select>
    );
}