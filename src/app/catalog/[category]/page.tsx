import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  CATEGORIES,
  isCategory,
  PERIPHERAL_SUBTYPES,
  isPeripheralSubtype,
  type PeripheralSubtype,
} from "@/lib/categories";
import ProductCard from "@/components/ProductCard";

const SORTS = {
  popular: { createdAt: "desc" as const },
  "price-asc": { price: "asc" as const },
  "price-desc": { price: "desc" as const },
  name: { name: "asc" as const },
};

type SortKey = keyof typeof SORTS;

const SORT_LABELS: Record<SortKey, string> = {
  popular: "Популярні",
  "price-asc": "Ціна ↑",
  "price-desc": "Ціна ↓",
  name: "За алфавітом",
};

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string; brand?: string; subtype?: string }>;
}) {
  const { category } = await params;
  const sp = await searchParams;

  if (!isCategory(category)) notFound();

  const sortKey: SortKey = (sp.sort as SortKey) in SORTS ? (sp.sort as SortKey) : "popular";
  const orderBy = SORTS[sortKey];

  const subtype =
    category === "headset" && sp.subtype && isPeripheralSubtype(sp.subtype)
      ? sp.subtype
      : undefined;

  const where = {
    category,
    ...(sp.brand ? { brand: sp.brand } : {}),
    ...(subtype ? { subtype } : {}),
  };

  const [products, brandGroups] = await Promise.all([
    prisma.product.findMany({ where, orderBy }),
    prisma.product.groupBy({
      by: ["brand"],
      where: { category, ...(subtype ? { subtype } : {}) },
      _count: true,
    }),
  ]);

  function buildQs(overrides: Record<string, string | undefined>) {
    const next = {
      sort: sp.sort,
      brand: sp.brand,
      subtype: sp.subtype,
      ...overrides,
    };
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) {
      if (v) qs.set(k, v);
    }
    return qs.toString();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-sm text-[var(--color-muted)]">Каталог</div>
          <h1 className="text-3xl font-bold">{CATEGORIES[category]}</h1>
        </div>
        <div className="flex flex-wrap gap-1 text-sm">
          {(Object.keys(SORTS) as SortKey[]).map((key) => {
            const active = sortKey === key;
            return (
              <Link
                key={key}
                href={`/catalog/${category}?${buildQs({ sort: key })}`}
                className={`px-3 py-1.5 rounded border transition ${
                  active
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-white"
                    : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
                }`}
              >
                {SORT_LABELS[key]}
              </Link>
            );
          })}
        </div>
      </div>

      {category === "headset" && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href={`/catalog/headset?${buildQs({ subtype: undefined, brand: undefined })}`}
            className={`px-4 py-2 rounded-md border text-sm transition ${
              !subtype
                ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-white"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
            }`}
          >
            Усі
          </Link>
          {(Object.keys(PERIPHERAL_SUBTYPES) as PeripheralSubtype[]).map((key) => {
            const active = subtype === key;
            return (
              <Link
                key={key}
                href={`/catalog/headset?${buildQs({ subtype: key, brand: undefined })}`}
                className={`px-4 py-2 rounded-md border text-sm transition ${
                  active
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-white"
                    : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
                }`}
              >
                {PERIPHERAL_SUBTYPES[key]}
              </Link>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3">
          <div className="card p-4">
            <div className="font-semibold mb-3">Бренд</div>
            <div className="flex flex-col gap-1 text-sm">
              <Link
                href={`/catalog/${category}?${buildQs({ brand: undefined })}`}
                className={`px-2 py-1.5 rounded transition ${
                  !sp.brand
                    ? "bg-[var(--color-brand)]/10 text-white"
                    : "text-[var(--color-muted)] hover:text-white"
                }`}
              >
                Усі ({brandGroups.reduce((s, g) => s + g._count, 0)})
              </Link>
              {brandGroups.map((g) => (
                <Link
                  key={g.brand}
                  href={`/catalog/${category}?${buildQs({ brand: g.brand })}`}
                  className={`px-2 py-1.5 rounded transition flex justify-between ${
                    sp.brand === g.brand
                      ? "bg-[var(--color-brand)]/10 text-white"
                      : "text-[var(--color-muted)] hover:text-white"
                  }`}
                >
                  <span>{g.brand}</span>
                  <span className="text-xs">{g._count}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section className="col-span-12 md:col-span-9">
          {products.length === 0 ? (
            <div className="card p-8 text-center text-[var(--color-muted)]">
              Товарів не знайдено.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
