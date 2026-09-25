import Image from "next/image";
import { ImageIcon } from "@/components/ui/Icons";

export default function ProductThumb({ src, alt, size = 48 }) {
  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 ring-1 ring-slate-200"
      >
        <ImageIcon className="h-5 w-5" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-lg bg-slate-50 object-cover ring-1 ring-slate-200"
    />
  );
}
