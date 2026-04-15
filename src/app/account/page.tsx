import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";
import { formatPrice } from "@/lib/categories";
import { logout } from "@/app/(auth)/actions";
import { Package, LogOut } from "lucide-react";

export default async function AccountPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/login");

  const [orderCount, recentOrders] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Особистий кабінет</h1>
          <p className="text-[var(--color-muted)] mt-1">
            {user.name ? `${user.name}, ` : ""}{user.email}
          </p>
        </div>
        <form action={logout}>
          <button className="btn-ghost inline-flex items-center gap-2">
            <LogOut size={16} /> Вийти
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Link href="/account/orders" className="card p-5">
          <Package className="text-[var(--color-brand)]" />
          <div className="mt-3 font-semibold">Мої замовлення</div>
          <div className="text-sm text-[var(--color-muted)]">
            Всього замовлень: {orderCount}
          </div>
        </Link>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Останні замовлення</h2>
          <Link href="/account/orders" className="text-sm text-[var(--color-brand)] hover:underline">
            Усі замовлення →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="card p-8 text-center text-[var(--color-muted)]">
            У вас поки немає замовлень.
          </div>
        ) : (
          <div className="card divide-y divide-[var(--color-border)]">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-[var(--color-surface-2)]"
              >
                <div>
                  <div className="font-medium">Замовлення #{order.id.slice(-8).toUpperCase()}</div>
                  <div className="text-sm text-[var(--color-muted)]">
                    {order.createdAt.toLocaleDateString("uk-UA")} · {order.items.length} товарів
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatPrice(order.total)}</div>
                  <StatusBadge status={order.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    pending: { label: "Очікує оплати", color: "text-yellow-400" },
    paid: { label: "Оплачено", color: "text-green-400" },
    shipped: { label: "Відправлено", color: "text-blue-400" },
    delivered: { label: "Доставлено", color: "text-green-500" },
  };
  const info = map[status] ?? { label: status, color: "text-[var(--color-muted)]" };
  return <div className={`text-xs ${info.color}`}>{info.label}</div>;
}
