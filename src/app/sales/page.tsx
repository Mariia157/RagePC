import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Percent } from "lucide-react";
import { CATEGORIES, type Category } from "@/lib/categories";
import ProductCardWithPopup from "@/components/ProductCardWithPopup";
import SalesFilters from "@/components/SalesFilters";
import MobileFilterToggle from "@/components/MobileFilterToggle";

const SORTS = {
  discount: { discount: "desc" as const },
  "price-asc": { price: "asc" as const },
  "price-desc": { price: "desc" as const },
};

type SortKey = keyof typeof SORTS;

const SORT_LABELS: Record<SortKey, string> = {
  discount: "Знижка",
  "price-asc": "Ціна ↑",
  "price-desc": "Ціна ↓",
};

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;

  const sortKey: SortKey = (sp.sort as SortKey) in SORTS ? (sp.sort as SortKey) : "discount";

  const allProducts = await prisma.product.findMany({
    where: { discount: { not: null } },
  });

  const selectedBrands = sp.brand?.split(",").filter(Boolean) ?? [];
  const selectedCategories = sp.category?.split(",").filter(Boolean) ?? [];
  const minPrice = sp.minPrice ? parseInt(sp.minPrice) : undefined;
  const maxPrice = sp.maxPrice ? parseInt(sp.maxPrice) : undefined;

  let filtered = allProducts;

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) => selectedCategories.includes(p.category));
  }
  if (selectedBrands.length > 0) {
    filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
  }
  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  // Sort
  const sortField = Object.keys(SORTS[sortKey])[0] as string;
  const sortDir = Object.values(SORTS[sortKey])[0] as string;
  filtered.sort((a, b) => {
    const aVal = (a as any)[sortField] ?? 0;
    const bVal = (b as any)[sortField] ?? 0;
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  // Filter options from all products
  const brandGroups = Object.entries(
    allProducts.reduce<Record<string, number>>((acc, p) => {
      acc[p.brand] = (acc[p.brand] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([brand, count]) => ({ brand, count }));

  const categoryGroups = Object.entries(
    allProducts.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([category, count]) => ({
    category,
    label: CATEGORIES[category as Category] ?? category,
    count,
  }));

  const prices = allProducts.map((p) => p.price);
  const priceRange = { min: Math.min(...prices, 0), max: Math.max(...prices, 0) };

  function buildQs(overrides: Record<string, string | undefined>) {
    const next = { ...sp, ...overrides };
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) {
      if (v) qs.set(k, v);
    }
    return qs.toString();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-sm text-[var(--color-muted)] mb-4">
        <Link href="/" className="hover:text-[var(--color-foreground)] transition">Головна</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-foreground)]">Акції</span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-brand)]/15 flex items-center justify-center">
            <Percent size={20} className="text-[var(--color-brand)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Акції</h1>
            <p className="text-sm text-[var(--color-muted)]">
              {filtered.length} товарів зі знижкою
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 text-sm">
          {(Object.keys(SORTS) as SortKey[]).map((key) => {
            const active = sortKey === key;
            return (
              <Link
                key={key}
                href={`/sales?${buildQs({ sort: key })}`}
                className={`chip ${active ? "chip-active" : ""}`}
              >
                {SORT_LABELS[key]}
              </Link>
            );
          })}
        </div>
      </div>

      <MobileFilterToggle>
        <SalesFilters
          brands={brandGroups}
          categories={categoryGroups}
          priceRange={priceRange}
        />
      </MobileFilterToggle>

      <div className="grid grid-cols-12 gap-6">
        <aside className="hidden md:block md:col-span-3">
          <div className="card p-5 md:sticky md:top-40">
            <SalesFilters
              brands={brandGroups}
              categories={categoryGroups}
              priceRange={priceRange}
            />
          </div>
        </aside>

        <section className="col-span-12 md:col-span-9">
          {filtered.length === 0 ? (
            <div className="card p-12 text-center text-[var(--color-muted)]">
              Товарів не знайдено.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {filtered.map((p) => (
                <ProductCardWithPopup key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
