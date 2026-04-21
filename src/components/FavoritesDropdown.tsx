"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Heart, X, Trash2 } from "lucide-react";
import { useFavorites } from "@/components/FavoritesProvider";
import { formatPrice, calcDiscountedPrice } from "@/lib/categories";
import ProductImage from "@/components/ProductImage";
import { useLang } from "@/components/LangProvider";

type ProductData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  discount: number | null;
  image: string;
};

export default function FavoritesDropdown({ products }: { products: ProductData[] }) {
  const { ids, toggle, count } = useFavorites();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const favoriteProducts = products.filter((p) => ids.includes(p.id));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Обране"
        className="p-2.5 rounded-full hover:bg-[var(--color-surface)] transition relative"
      >
        <Heart size={20} />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-brand)] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[350px] max-h-[70vh] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl shadow-black/40 z-50 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
            <span className="font-semibold">{t("fav.title")} ({count})</span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-[var(--color-surface-2)] transition"
            >
              <X size={18} />
            </button>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="p-8 text-center text-[var(--color-muted)]">
              <Heart className="mx-auto mb-3" size={36} />
              <p>{t("fav.empty")}</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
              {favoriteProducts.map((p) => {
                const discounted = calcDiscountedPrice(p.price, p.discount);
                return (
                  <div key={p.id} className="flex gap-3 p-3 group">
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={() => setOpen(false)}
                    >
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        brand={p.brand}
                        size="sm"
                        className="rounded-lg"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium truncate block hover:text-[var(--color-brand)] transition"
                      >
                        {p.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-[var(--color-brand)]">
                          {formatPrice(discounted)}
                        </span>
                        {p.discount && (
                          <span className="text-xs text-[var(--color-muted)] line-through">
                            {formatPrice(p.price)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggle(p.id)}
                      className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-brand)] transition shrink-0 self-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
