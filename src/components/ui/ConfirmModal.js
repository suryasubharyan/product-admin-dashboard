"use client";

import { useEffect } from "react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={() => !isLoading && onCancel()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-gray-900">
          {title}
        </h2>
        <p className="text-sm text-gray-600">{message}</p>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
