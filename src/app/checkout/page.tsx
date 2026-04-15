import { redirect } from "next/navigation";
import Link from "next/link";
import { getCart } from "@/lib/cart";
import { getCurrentUserId } from "@/lib/session";
import { formatPrice } from "@/lib/categories";
import CheckoutForm from "@/components/CheckoutForm";

export default async function CheckoutPage() {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }

  const items = await getCart();
  if (items.length === 0) redirect("/cart");

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/cart" className="text-sm text-[var(--color-muted)] hover:text-white">
        ← Кошик
      </Link>
      <h1 className="text-3xl font-bold mt-2 mb-6">Оформлення замовлення</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-6">
          <CheckoutForm />
        </div>

        <aside className="card p-5 h-fit">
          <h2 className="font-semibold">Ваше замовлення</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-2">
                <span className="truncate">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[var(--color-border)] mt-4 pt-4 flex justify-between text-lg font-bold">
            <span>Разом</span>
            <span className="text-[var(--color-brand)]">{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
