"use client";

import { useState } from "react";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";

export default function SearchInput({ value, onSearch }) {
  const [text, setText] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [lastSent, setLastSent] = useState(value);

  // Sync the input when the URL changes from outside (category change, back button).
  if (value !== prevValue) {
    setPrevValue(value);
    if (value !== lastSent) {
      setText(value);
      setLastSent(value);
    }
  }

  const debouncedSearch = useDebouncedCallback((next) => {
    const trimmed = next.trim();
    if (trimmed === lastSent) return;
    setLastSent(trimmed);
    onSearch(trimmed);
  }, 500);

  function handleChange(e) {
    setText(e.target.value);
    debouncedSearch(e.target.value);
  }

  return (
    <div className="relative w-full md:max-w-xs">
      <input
        type="search"
        value={text}
        onChange={handleChange}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
