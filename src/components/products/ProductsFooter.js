import Pagination from "@/components/ui/Pagination";
import PageSizeSelect from "@/components/ui/PageSizeSelect";
import { getPageRange } from "@/lib/pagination";

export default function ProductsFooter({ page, limit, total, totalPages, onPageChange, onLimitChange }) {
  const { from, to } = getPageRange(page, limit, total);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          Showing <b>{from}</b>–<b>{to}</b> of <b>{total}</b>
        </p>
        <PageSizeSelect value={limit} onChange={onLimitChange} />
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
