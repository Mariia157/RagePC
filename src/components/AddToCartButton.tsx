"use client";

import { useTransition, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { addToCart } from "@/app/cart/actions";
import { useLang } from "@/components/LangProvider";

export default function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const { t } = useLang();

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
      className="btn-primary w-full md:w-auto rounded-full"
    >
      {added ? (
        <>
          <Check size={18} /> {t("product.added")}
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          {pending ? t("product.adding") : t("product.addToCart")}
        </>
      )}
    </button>
  );
}
