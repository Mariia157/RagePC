import Image from "next/image";

type Size = "sm" | "md" | "lg" | "xl";

const SIZE_CLASS: Record<Size, string> = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-full aspect-square",
  xl: "w-full aspect-square",
};

const PIXELS: Record<Size, number> = {
  sm: 48,
  md: 64,
  lg: 400,
  xl: 800,
};

export default function ProductImage({
  src,
  alt,
  brand,
  size = "lg",
  className = "",
}: {
  src?: string | null;
  alt: string;
  brand: string;
  size?: Size;
  className?: string;
}) {
  const px = PIXELS[size];
  const hasImage = Boolean(src && !src.endsWith(".svg"));

  return (
    <div
      className={`${SIZE_CLASS[size]} bg-white rounded-xl overflow-hidden flex items-center justify-center shrink-0 relative ${className}`}
    >
      {hasImage ? (
        <Image
          src={src!}
          alt={alt}
          width={px}
          height={px}
          className="w-full h-full object-contain"
        />
      ) : (
        <span
          className={`font-black text-[var(--color-muted)] ${
            size === "sm"
              ? "text-xl"
              : size === "md"
                ? "text-2xl"
                : "text-6xl md:text-8xl"
          }`}
        >
          {brand[0]}
        </span>
      )}
    </div>
  );
}
