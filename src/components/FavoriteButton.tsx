"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/components/FavoritesProvider";

export default function FavoriteButton({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const { toggle, has } = useFavorites();
  const isFav = has(productId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={isFav ? "Прибрати з обраного" : "Додати в обране"}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
        isFav
          ? "bg-[var(--color-brand)] text-white"
          : "bg-black/40 text-white/70 hover:bg-[var(--color-brand)]/80 hover:text-white"
      } ${className}`}
    >
      <Heart size={14} fill={isFav ? "currentColor" : "none"} />
    </button>
  );
}
