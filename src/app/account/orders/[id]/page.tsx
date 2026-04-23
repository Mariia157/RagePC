import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";
import { formatPrice, CATEGORIES, type Category } from "@/lib/categories";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: { id, userId },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/account/orders" className="text-sm text-[var(--color-muted)] hover:text-white inline-flex items-center gap-1">
        <ArrowLeft size={14} /> До списку замовлень
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap mt-3">
        <div>
          <h1 className="text-3xl font-bold">Замовлення #{order.id.slice(-8).toUpperCase()}</h1>
          <p className="text-[var(--color-muted)] mt-1">
            {order.createdAt.toLocaleString("uk-UA")}
          </p>
        </div>
        <div className="card px-4 py-2 text-sm">
          Статус: <span className="font-semibold ml-1">{order.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 card divide-y divide-[var(--color-border)]">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div>
                <div className="text-xs text-[var(--color-muted)]">
                  {CATEGORIES[item.category as Category] ?? item.category}
                </div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-[var(--color-muted)]">
                  {formatPrice(item.price)} × {item.quantity}
                </div>
              </div>
              <div className="font-bold">{formatPrice(item.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="card p-4">
            <h2 className="font-semibold mb-2">Доставка</h2>
            <div className="text-sm text-[var(--color-muted)] space-y-0.5">
              <div>{order.fullName}</div>
              <div>{order.phone}</div>
              <div>{order.postal}, {order.city}</div>
              <div>{order.street}</div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Разом</span>
              <span className="text-[var(--color-brand)]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
