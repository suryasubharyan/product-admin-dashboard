export default function EmptyState({ title = "No products found", description }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-12 text-center">
      <p className="font-medium text-gray-800">{title}</p>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  );
}
