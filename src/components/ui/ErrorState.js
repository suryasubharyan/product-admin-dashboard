import { AlertIcon, RefreshIcon } from "./Icons";
import { secondaryButtonClass } from "./styles";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-xl border border-red-200 bg-white px-6 py-16 text-center motion-safe:animate-fade-in"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertIcon className="h-6 w-6" />
      </div>
      <p className="mt-4 font-medium text-slate-900">Something went wrong</p>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={`${secondaryButtonClass} mt-6`}>
          <RefreshIcon className="h-4 w-4" />
          Retry
        </button>
      )}
    </div>
  );
}
