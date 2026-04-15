import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/categories";
import { Cpu, Zap } from "lucide-react";
import BuildImage from "@/components/BuildImage";

const TIER_LABEL: Record<string, string> = {
  "1080p": "1080p",
  "1440p": "1440p",
  "4K": "4K",
  "mini": "Mini-ITX",
};

export default async function BuildsPage() {
  const builds = await prisma.prebuiltBuild.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      components: { include: { product: true } },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black">Готові збірки</h1>
        <p className="text-[var(--color-muted)] mt-1 max-w-2xl">
          Протестовані конфігурації від інженерів RagePC. Сумісність
          перевірена, продуктивність заміряна. Залишається лише натиснути кнопку.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {builds.map((b) => {
          const total = b.components.reduce((s, c) => s + c.product.price, 0);
          const cpu = b.components.find((c) => c.product.category === "cpu");
          const gpu = b.components.find((c) => c.product.category === "gpu");

          return (
            <Link
              key={b.id}
              href={`/builds/${b.slug}`}
              className="card p-0 flex flex-col overflow-hidden group"
            >
              <BuildImage
                src={b.image}
                alt={b.name}
                tier={TIER_LABEL[b.tier] ?? b.tier}
                aspect="video"
                className="rounded-none"
              />
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-brand)] font-bold">
                    {TIER_LABEL[b.tier] ?? b.tier}
                  </span>
                  <Zap size={16} className="text-[var(--color-muted)]" />
                </div>
                <h2 className="text-2xl font-bold">{b.name}</h2>
                <p className="text-sm text-[var(--color-muted)]">{b.tagline}</p>

                <div className="mt-2 space-y-1 text-sm">
                  {cpu && (
                    <div className="flex items-center gap-2">
                      <Cpu size={14} className="text-[var(--color-muted)]" />
                      <span className="truncate">{cpu.product.name}</span>
                    </div>
                  )}
                  {gpu && (
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-[var(--color-muted)]" />
                      <span className="truncate">{gpu.product.name}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-4 flex items-end justify-between">
                  <div className="text-sm text-[var(--color-muted)]">
                    {b.components.length} компонентів
                  </div>
                  <div className="text-2xl font-black text-[var(--color-brand)]">
                    {formatPrice(total)}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
