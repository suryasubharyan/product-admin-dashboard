// Input wrapper where the label sits on the border line (fieldset + legend).
export default function LegendField({ id, label, icon: Icon, trailing, children }) {
  return (
    <fieldset className="group rounded-xl border border-slate-300/80 bg-white/50 px-3 pb-2.5 transition-colors hover:border-slate-400/80 focus-within:border-emerald-500">
      <legend className="px-1.5 text-xs font-medium text-slate-500 transition-colors group-focus-within:text-emerald-700">
        <label htmlFor={id}>{label}</label>
      </legend>
      <div className="flex items-center gap-2.5">
        {Icon && (
          <Icon className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
        )}
        {children}
        {trailing}
      </div>
    </fieldset>
  );
}

export const legendInputClass =
  "w-full bg-transparent py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none";
