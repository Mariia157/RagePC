"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice, calcDiscountedPrice } from "@/lib/categories";
import { removeCartItem, updateCartItem } from "@/app/cart/actions";
import ProductImage from "@/components/ProductImage";
import { useLang } from "@/components/LangProvider";

type CartItemData = {
  id: string;
  quantity: number;
  product: {
    slug: string;
    name: string;
    brand: string;
    price: number;
    discount: number | null;
    image: string;
  };
};

export default function CartDropdown({
  items,
  count,
}: {
  items: CartItemData[];
  count: number;
}) {
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

  const total = items.reduce((s, i) => {
    const price = calcDiscountedPrice(i.product.price, i.product.discount);
    return s + price * i.quantity;
  }, 0);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Кошик"
        className="p-2.5 rounded-full hover:bg-[var(--color-surface)] transition relative"
      >
        <ShoppingCart size={20} />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-brand)] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[380px] max-h-[70vh] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl shadow-black/40 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
            <span className="font-semibold">{t("cart.title")} ({count})</span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-[var(--color-surface-2)] transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="p-8 text-center text-[var(--color-muted)]">
              <ShoppingCart className="mx-auto mb-3" size={36} />
              <p>{t("cart.empty")}</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
                {items.map((item) => {
                  const discounted = calcDiscountedPrice(item.product.price, item.product.discount);
                  return (
                    <div key={item.id} className="flex gap-3 p-3">
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        brand={item.product.brand}
                        size="sm"
                        className="rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {item.product.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-sm font-bold text-[var(--color-brand)]">
                            {formatPrice(discounted)}
                          </div>
                          {item.product.discount && (
                            <div className="text-xs text-[var(--color-muted)] line-through">
                              {formatPrice(item.product.price)}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-brand)] transition text-xs"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-brand)] transition text-xs"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeCartItem(item.id)}
                            className="ml-auto p-1 text-[var(--color-muted)] hover:text-[var(--color-brand)] transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-[var(--color-border)] p-4 space-y-3">
                <div className="flex justify-between font-semibold">
                  <span>{t("cart.total")}</span>
                  <span className="text-[var(--color-brand)]">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full rounded-full"
                >
                  {t("cart.checkout")}
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
