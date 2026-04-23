import Image from "next/image";
import { Cpu } from "lucide-react";

type Aspect = "square" | "video" | "hero";

const ASPECT: Record<Aspect, string> = {
  square: "aspect-square",
  video: "aspect-video",
  hero: "aspect-[3/2]",
};

export default function BuildImage({
  src,
  alt,
  tier,
  aspect = "video",
  className = "",
}: {
  src?: string | null;
  alt: string;
  tier?: string;
  aspect?: Aspect;
  className?: string;
}) {
  const hasImage = Boolean(src);

  return (
    <div
      className={`${ASPECT[aspect]} w-full bg-[var(--color-surface-2)] rounded-xl overflow-hidden flex items-center justify-center relative ${className}`}
    >
      {hasImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(400px circle at 30% 30%, rgba(220,38,38,0.3), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-2 text-[var(--color-muted)]">
            <Cpu size={48} className="text-[var(--color-brand)]/60" />
            {tier && (
              <span className="text-xs uppercase tracking-widest font-bold">
                {tier}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
