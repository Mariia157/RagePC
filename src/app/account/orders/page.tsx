import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";
import { formatPrice } from "@/lib/categories";

const STATUSES = [
  { key: "all", label: "Усі" },
  { key: "pending", label: "Очікують" },
  { key: "paid", label: "Оплачені" },
  { key: "shipped", label: "Відправлені" },
  { key: "delivered", label: "Доставлені" },
];

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const sp = await searchParams;
  const status = sp.status && sp.status !== "all" ? sp.status : undefined;

  const orders = await prisma.order.findMany({
    where: { userId, ...(status ? { status } : {}) },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <Link href="/account" className="text-sm text-[var(--color-muted)] hover:text-white inline-flex items-center gap-1">
          <ArrowLeft size={14} /> Особистий кабінет
        </Link>
        <h1 className="text-3xl font-bold mt-2">Історія замовлень</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => {
          const active = (sp.status ?? "all") === s.key;
          return (
            <Link
              key={s.key}
              href={s.key === "all" ? "/account/orders" : `/account/orders?status=${s.key}`}
              className={`px-3 py-1.5 rounded border text-sm transition ${
                active
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-white"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <div className="card p-8 text-center text-[var(--color-muted)]">
          Замовлень не знайдено.
        </div>
      ) : (
        <div className="card divide-y divide-[var(--color-border)]">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between p-4 hover:bg-[var(--color-surface-2)]"
            >
              <div>
                <div className="font-medium">Замовлення #{order.id.slice(-8).toUpperCase()}</div>
                <div className="text-sm text-[var(--color-muted)]">
                  {order.createdAt.toLocaleString("uk-UA")} · {order.items.length} товарів
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{formatPrice(order.total)}</div>
                <div className="text-xs text-[var(--color-muted)]">{order.status}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
