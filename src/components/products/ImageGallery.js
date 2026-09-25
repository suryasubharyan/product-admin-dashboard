"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 text-gray-400">
        No image
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Image
          src={images[activeIndex]}
          alt={title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, index) => (
            <button
              key={src}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded border-2 ${
                index === activeIndex ? "border-blue-600" : "border-transparent"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
