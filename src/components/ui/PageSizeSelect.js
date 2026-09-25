import { PAGE_SIZES } from "@/lib/productQuery";

export default function PageSizeSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      Per page
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-800"
      >
        {PAGE_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </label>
  );
}
