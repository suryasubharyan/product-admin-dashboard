import { PAGE_SIZES } from "@/lib/productQuery";

export default function PageSizeSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      Rows per page
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/15"
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
