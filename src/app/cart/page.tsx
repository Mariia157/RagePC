import Link from "next/link";
import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/categories";
import CartItemRow from "@/components/CartItemRow";
import { ShoppingCart } from "lucide-react";

export default async function CartPage() {
  const items = await getCart();
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Кошик</h1>

      {items.length === 0 ? (
        <div className="card p-12 text-center">
          <ShoppingCart className="mx-auto text-[var(--color-muted)]" size={48} />
          <p className="mt-4 text-[var(--color-muted)]">Ваш кошик порожній.</p>
          <Link href="/catalog/cpu" className="btn-primary mt-6 inline-flex">
            До каталогу
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card divide-y divide-[var(--color-border)]">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          <aside className="card p-5 h-fit">
            <h2 className="font-semibold text-lg">Разом</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Товари</span>
                <span>{items.reduce((s, i) => s + i.quantity, 0)} шт.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Доставка</span>
                <span>Безкоштовно</span>
              </div>
              <div className="border-t border-[var(--color-border)] pt-3 flex justify-between text-lg font-bold">
                <span>До сплати</span>
                <span className="text-[var(--color-brand)]">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full mt-5">
              Оформити замовлення
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
