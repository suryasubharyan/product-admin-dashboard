import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function SearchInput({ value, onSearch }) {
   const [text, setText] = useState(value);
   const debounceText = useDebounce(text, 500);
   const lastSentRef = useRef(value);

   useEffect(() => {
      if (value !== lastSentRef.current) {
        lastSentRef.current = value;
        setText(value);
      }
   }, [value]);

   useEffect(() => {
      if (debounceText !== text) return;
      const trimmed = debounceText.trim();
      if (trimmed !== lastSentRef.current) {
        lastSentRef.current = trimmed;
        onSearch(trimmed);
      }
   }, [debounceText, text, onSearch]);

   return (
    <div className="relative w-full md:max-w-xs">
       <input 
         type="search"
         value={text}
         onChange={(e) => setText(e.target.value)}
         placeholder="Search products..."
         aria-label="Search products"
         className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-blue-500 "
       />
    </div>
   );
}