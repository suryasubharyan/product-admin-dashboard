export default function StockBadge({ stock }) {
  let style = "bg-green-50 text-green-700";
  let label = `${stock} in stock`;

  if (stock === 0) {
    style = "bg-red-50 text-red-700";
    label = "Out of stock";
  } else if (stock < 10) {
    style = "bg-yellow-50 text-yellow-800";
    label = `Low: ${stock}`;
  }

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}
