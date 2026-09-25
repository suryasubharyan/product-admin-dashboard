import { inputClass } from "@/components/ui/styles";

export default function CategorySelect({ value, categories, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by category"
      className={`${inputClass} md:w-52`}
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
