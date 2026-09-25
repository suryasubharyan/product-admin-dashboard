"use client";

import { useCallback, useEffect, useRef } from "react";

// Returns a function that runs `callback` only after `delay` ms without new calls.
export default function useDebouncedCallback(callback, delay = 500) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return useCallback(
    (...args) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => callbackRef.current(...args), delay);
    },
    [delay]
  );
}
