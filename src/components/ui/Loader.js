export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20" role="status">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}
