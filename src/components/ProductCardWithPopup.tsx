"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useTransition } from "react";
import { formatPrice, calcDiscountedPrice } from "@/lib/categories";
import { addToCart } from "@/app/cart/actions";
import ProductImage from "@/components/ProductImage";
import FavoriteButton from "@/components/FavoriteButton";
import { useLang } from "@/components/LangProvider";

type ProductData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  discount: number | null;
  image: string;
  description: string;
  socket?: string | null;
  cores?: number | null;
  threads?: number | null;
  vramGb?: number | null;
  ramCapacityGb?: number | null;
  ramType?: string | null;
  wattage?: number | null;
  formFactor?: string | null;
  connection?: string | null;
};

function getQuickSpecs(p: ProductData): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = [];
  if (p.socket) specs.push({ label: "Сокет", value: p.socket });
  if (p.cores) specs.push({ label: "Ядра", value: `${p.cores}` });
  if (p.threads) specs.push({ label: "Потоки", value: `${p.threads}` });
  if (p.vramGb) specs.push({ label: "VRAM", value: `${p.vramGb} ГБ` });
  if (p.ramCapacityGb) specs.push({ label: "Об'єм", value: `${p.ramCapacityGb} ГБ` });
  if (p.ramType) specs.push({ label: "Тип", value: p.ramType });
  if (p.wattage) specs.push({ label: "Потужність", value: `${p.wattage} Вт` });
  if (p.formFactor) specs.push({ label: "Форм-фактор", value: p.formFactor });
  if (p.connection) specs.push({ label: "Підключення", value: p.connection });
  return specs.slice(0, 4);
}

export default function ProductCardWithPopup({ product }: { product: ProductData }) {
  const [hovered, setHovered] = useState(false);
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  const discounted = calcDiscountedPrice(product.price, product.discount);
  const specs = getQuickSpecs(product);

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHovered(true), 300);
  }

  function handleMouseLeave() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHovered(false), 200);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      await addToCart(product.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    });
  }

  return (
    <div
      ref={cardRef}
      className={`relative group ${hovered ? "z-50" : "z-0"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/product/${product.slug}`}
        className={`block bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden flex flex-col h-full transition-all duration-200 ${
          hovered
            ? "rounded-t-2xl rounded-b-none border-b-0 border-[var(--color-brand)] shadow-2xl shadow-black/40 translate-y-[-2px]"
            : "rounded-2xl hover:border-[var(--color-brand)] hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/30"
        }`}
      >
        <div className="p-4 pb-2 relative">
          {product.discount && (
            <span className="absolute top-3 left-3 z-10 bg-[var(--color-brand)] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
          <FavoriteButton productId={product.id} className="absolute top-3 right-3 z-10" />
          <ProductImage
            src={product.image}
            alt={product.name}
            brand={product.brand}
            size="lg"
            className="rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="px-4 pb-4 flex-1 flex flex-col">
          <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-medium">
            {product.brand}
          </div>
          <div className="font-semibold text-sm mt-1 line-clamp-2 leading-snug">
            {product.name}
          </div>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-[var(--color-brand)]">
                {formatPrice(discounted)}
              </div>
              {product.discount && (
                <div className="text-xs text-[var(--color-muted)] line-through">
                  {formatPrice(product.price)}
                </div>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={pending}
              className="w-9 h-9 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center hover:bg-[var(--color-brand)] transition-all duration-200 group/btn"
            >
              {added ? (
                <Check size={16} className="text-[var(--color-success)]" />
              ) : (
                <ShoppingCart
                  size={16}
                  className="text-[var(--color-brand)] group-hover/btn:text-white transition"
                />
              )}
            </button>
          </div>
        </div>
      </Link>

      {/* Hover popup — continues below the card */}
      {hovered && (
        <div className="absolute left-0 right-0 top-full z-50 animate-in">
          <div className="bg-[var(--color-surface)] border border-t-0 border-[var(--color-brand)] rounded-b-2xl shadow-2xl shadow-black/50 p-4">
            <p className="text-xs text-[var(--color-muted)] mb-3 line-clamp-2">
              {product.description}
            </p>
            {specs.length > 0 && (
              <div className="space-y-1.5 mb-3">
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between text-xs">
                    <span className="text-[var(--color-muted)]">{s.label}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            <div className={`${specs.length > 0 ? "pt-3 border-t border-[var(--color-border)]" : ""}`}>
              <button
                onClick={handleAddToCart}
                disabled={pending}
                className="btn-primary w-full text-sm py-2 rounded-full"
              >
                {added ? (
                  <><Check size={14} /> {t("product.added")}</>
                ) : (
                  <><ShoppingCart size={14} /> {t("product.addToCart")}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
