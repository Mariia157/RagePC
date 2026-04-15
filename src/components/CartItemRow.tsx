"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/categories";
import { removeCartItem, updateCartItem } from "@/app/cart/actions";
import ProductImage from "@/components/ProductImage";

type Item = {
  id: string;
  quantity: number;
  product: {
    slug: string;
    name: string;
    brand: string;
    price: number;
    image: string;
  };
};

export default function CartItemRow({ item }: { item: Item }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-4 p-4">
      <ProductImage
        src={item.product.image}
        alt={item.product.name}
        brand={item.product.brand}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${item.product.slug}`}
          className="font-medium hover:text-[var(--color-brand)]"
        >
          {item.product.name}
        </Link>
        <div className="text-sm text-[var(--color-muted)]">
          {formatPrice(item.product.price)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={pending}
          onClick={() =>
            startTransition(() => updateCartItem(item.id, item.quantity - 1))
          }
          className="w-8 h-8 rounded border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-brand)] disabled:opacity-50"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          disabled={pending}
          onClick={() =>
            startTransition(() => updateCartItem(item.id, item.quantity + 1))
          }
          className="w-8 h-8 rounded border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-brand)] disabled:opacity-50"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="font-bold w-24 text-right">
        {formatPrice(item.product.price * item.quantity)}
      </div>

      <button
        disabled={pending}
        onClick={() => startTransition(() => removeCartItem(item.id))}
        aria-label="Видалити"
        className="p-2 text-[var(--color-muted)] hover:text-[var(--color-brand)] disabled:opacity-50"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
