export default function StockBadge({ stock }) {
  let style = "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
  let dot = "bg-emerald-500";
  let label = `${stock} in stock`;

  if (stock === 0) {
    style = "bg-red-50 text-red-700 ring-red-600/20";
    dot = "bg-red-500";
    label = "Out of stock";
  } else if (stock < 10) {
    style = "bg-amber-50 text-amber-800 ring-amber-600/20";
    dot = "bg-amber-500";
    label = `Low stock · ${stock}`;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
