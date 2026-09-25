import Image from "next/image";

export default function ProductThumb({ src, alt, size = 48 }) {
  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded bg-gray-100 text-xs text-gray-400"
      >
        No img
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
      className="shrink-0 rounded bg-gray-100 object-cover"
    />
  );
}
