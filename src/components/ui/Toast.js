"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AlertIcon, CheckIcon, XIcon } from "./Icons";

const TOAST_DURATION = 3500;

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      nextId.current += 1;
      const id = nextId.current;
      setToasts((list) => [...list, { id, message, type }]);
      setTimeout(() => dismiss(id), TOAST_DURATION);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-5 z-[60] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-lg motion-safe:animate-slide-in-down"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                toast.type === "error" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {toast.type === "error" ? <AlertIcon /> : <CheckIcon />}
            </span>
            <p className="flex-1 font-medium text-slate-800">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToast = useContext(ToastContext);
  if (!showToast) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return showToast;
}
