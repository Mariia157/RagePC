"use client";

import { useState, useTransition } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { addBuildToCart } from "@/app/cart/actions";

export default function AddBuildButton({ productIds }: { productIds: string[] }) {
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  function handleClick() {
    startTransition(async () => {
      await addBuildToCart(productIds);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    });
  }

  return (
    <button onClick={handleClick} disabled={pending} className="btn-primary w-full mt-4">
      {added ? (
        <><Check size={16} /> Додано</>
      ) : (
        <><ShoppingCart size={16} /> {pending ? "Додаємо..." : "Додати збірку в кошик"}</>
      )}
    </button>
  );
}
