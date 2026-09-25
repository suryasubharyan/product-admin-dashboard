"use client";

import { useState } from "react";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { SearchIcon } from "@/components/ui/Icons";
import { inputClass } from "@/components/ui/styles";

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
    <div className="relative w-full md:max-w-sm">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={text}
        onChange={handleChange}
        placeholder="Search products..."
        aria-label="Search products"
        className={`${inputClass} pl-9`}
      />
    </div>
  );
}
