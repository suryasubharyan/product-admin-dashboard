import Pagination from "@/components/ui/Pagination";
import PageSizeSelect from "@/components/ui/PageSizeSelect";
import { getPageRange } from "@/lib/pagination";

export default function ProductsFooter({ page, limit, total, totalPages, onPageChange, onLimitChange }) {
  const { from, to } = getPageRange(page, limit, total);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <p className="text-sm text-slate-600">
          Showing <span className="font-medium text-slate-900">{from}</span>–
          <span className="font-medium text-slate-900">{to}</span> of{" "}
          <span className="font-medium text-slate-900">{total}</span>
        </p>
        <PageSizeSelect value={limit} onChange={onLimitChange} />
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
