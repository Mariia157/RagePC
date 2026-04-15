"use client";

import { useTransition, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { addToCart } from "@/app/cart/actions";

export default function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  function handleClick() {
    startTransition(async () => {
      await addToCart(productId, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || pending}
      className="btn-primary w-full md:w-auto"
    >
      {added ? (
        <>
          <Check size={18} /> Додано
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          {pending ? "Додаємо..." : "В кошик"}
        </>
      )}
    </button>
  );
}
