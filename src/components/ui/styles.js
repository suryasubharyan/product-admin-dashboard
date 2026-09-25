// Shared Tailwind class strings so buttons and inputs look the same everywhere.

const inputBase =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-4";

export const inputClass = `${inputBase} border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/15`;

export const inputErrorClass = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-500/15`;

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export const primaryButtonClass = `${buttonBase} bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:ring-emerald-500`;

export const secondaryButtonClass = `${buttonBase} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-emerald-500`;

export const dangerButtonClass = `${buttonBase} bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500`;

export const badgeClass =
  "inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-700";
