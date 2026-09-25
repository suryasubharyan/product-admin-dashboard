const SIZES = {
  sm: "h-8 w-8 rounded-lg text-[13px]",
  lg: "h-12 w-12 rounded-xl text-lg",
};

export default function Logo({ size = "sm", className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-linear-to-br from-emerald-500 to-teal-600 font-black italic tracking-tighter text-white shadow-sm shadow-emerald-600/30 ${SIZES[size]} ${className}`}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/15" />
      <span className="relative pr-0.5">SS</span>
    </span>
  );
}
