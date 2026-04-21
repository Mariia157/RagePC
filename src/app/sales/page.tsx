import { prisma } from "@/lib/prisma";
import { Percent } from "lucide-react";
import ProductCardWithPopup from "@/components/ProductCardWithPopup";

export default async function SalesPage() {
  const products = await prisma.product.findMany({
    where: { discount: { not: null } },
    orderBy: { discount: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[var(--color-brand)]/15 flex items-center justify-center">
          <Percent size={20} className="text-[var(--color-brand)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Акції</h1>
          <p className="text-sm text-[var(--color-muted)]">
            {products.length} товарів зі знижкою
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="card p-12 text-center text-[var(--color-muted)] rounded-2xl">
          Наразі немає активних акцій.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCardWithPopup key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
