import Link from "next/link";
import { ArrowLeftIcon } from "./Icons";

export default function BackLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-2 pr-4 text-sm font-medium text-slate-600 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-emerald-50">
        <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
      </span>
      {children}
    </Link>
  );
}
