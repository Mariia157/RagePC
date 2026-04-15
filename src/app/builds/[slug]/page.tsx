import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CATEGORIES, formatPrice, type Category } from "@/lib/categories";
import AddBuildButton from "@/components/AddBuildButton";
import ProductImage from "@/components/ProductImage";
import BuildImage from "@/components/BuildImage";

export default async function BuildDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const build = await prisma.prebuiltBuild.findUnique({
    where: { slug },
    include: { components: { include: { product: true } } },
  });

  if (!build) notFound();

  const total = build.components.reduce((s, c) => s + c.product.price, 0);
  const productIds = build.components.map((c) => c.productId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="text-sm text-[var(--color-muted)] mb-4">
        <Link href="/" className="hover:text-white">Головна</Link>
        <span className="mx-2">/</span>
        <Link href="/builds" className="hover:text-white">Готові збірки</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{build.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BuildImage
            src={build.image}
            alt={build.name}
            tier={build.tier}
            aspect="hero"
            className="mb-6"
          />
          <div className="text-xs uppercase tracking-wider text-[var(--color-brand)] font-bold">
            {build.tier}
          </div>
          <h1 className="text-4xl font-black mt-1">{build.name}</h1>
          <p className="text-lg text-[var(--color-muted)] mt-1">{build.tagline}</p>
          <p className="mt-4 text-[var(--color-muted)]">{build.description}</p>

          <h2 className="mt-8 text-xl font-bold">Комплектуючі</h2>
          <div className="card divide-y divide-[var(--color-border)] mt-3">
            {build.components.map((c) => (
              <Link
                key={c.id}
                href={`/product/${c.product.slug}`}
                className="flex items-center gap-4 p-4 hover:bg-[var(--color-surface-2)]"
              >
                <ProductImage
                  src={c.product.image}
                  alt={c.product.name}
                  brand={c.product.brand}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[var(--color-muted)] uppercase">
                    {CATEGORIES[c.product.category as Category] ?? c.product.category}
                  </div>
                  <div className="font-medium truncate">{c.product.name}</div>
                </div>
                <div className="font-bold shrink-0">{formatPrice(c.product.price)}</div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="md:sticky md:top-32 h-fit space-y-4">
          <div className="card p-5">
            <div className="text-sm text-[var(--color-muted)]">Підсумкова вартість</div>
            <div className="text-3xl font-black text-[var(--color-brand)] mt-1">
              {formatPrice(total)}
            </div>
            <div className="text-sm text-[var(--color-muted)] mt-1">
              {build.components.length} компонентів, зібрано та протестовано
            </div>
            <AddBuildButton productIds={productIds} />
          </div>

          <div className="card p-4 text-sm">
            <div className="font-semibold mb-2">Що входить</div>
            <ul className="text-[var(--color-muted)] space-y-1">
              <li>✓ Збирання та монтаж</li>
              <li>✓ Тестування стабільності</li>
              <li>✓ Встановлення Windows 11</li>
              <li>✓ Гарантія 2 роки</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
