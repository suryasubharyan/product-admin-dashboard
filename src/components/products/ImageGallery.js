"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "@/components/ui/Icons";

export default function ImageGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-slate-400">
        <ImageIcon className="h-10 w-10" />
        <span className="text-sm">No image</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Image
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-6 transition-transform duration-500 hover:scale-105 motion-safe:animate-fade-in"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-white transition ${
                index === activeIndex
                  ? "border-emerald-600 ring-2 ring-emerald-600/30"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
