"use client";

import { useEffect } from "react";
import { TrashIcon } from "./Icons";
import { dangerButtonClass, secondaryButtonClass } from "./styles";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  loadingLabel = "Please wait...",
  isLoading = false,
  error = "",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === "Escape" && !isLoading) onCancel();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isLoading, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm motion-safe:animate-fade-in"
      onClick={() => !isLoading && onCancel()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl motion-safe:animate-scale-in"
      >
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <TrashIcon className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h2 id="confirm-title" className="text-lg font-semibold text-slate-900">
              {title}
            </h2>
            <p className="text-sm text-slate-600">{message}</p>
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} disabled={isLoading} className={secondaryButtonClass}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isLoading} className={dangerButtonClass}>
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
