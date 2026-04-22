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
import ProductCardWithPopup from "@/components/ProductCardWithPopup";
import CatalogFilters from "@/components/CatalogFilters";
import MobileFilterToggle from "@/components/MobileFilterToggle";

const SORTS = {
  popular: { createdAt: "desc" as const },
  "price-asc": { price: "asc" as const },
  "price-desc": { price: "desc" as const },
};

type SortKey = keyof typeof SORTS;

const SORT_LABELS: Record<SortKey, string> = {
  popular: "Популярні",
  "price-asc": "Ціна ↑",
  "price-desc": "Ціна ↓",
};

// Spec filter config per category
const SPEC_FILTERS: Record<string, { key: string; label: string; field: string }[]> = {
  cpu: [
    { key: "socket", label: "Сокет", field: "socket" },
  ],
  gpu: [
    { key: "vramGb", label: "Відеопам'ять", field: "vramGb" },
  ],
  motherboard: [
    { key: "socket", label: "Сокет", field: "socket" },
    { key: "ramType", label: "Тип пам'яті", field: "ramType" },
    { key: "formFactor", label: "Форм-фактор", field: "formFactor" },
  ],
  ram: [
    { key: "ramType", label: "Тип пам'яті", field: "ramType" },
    { key: "ramCapacityGb", label: "Об'єм (ГБ)", field: "ramCapacityGb" },
  ],
  ssd: [
    { key: "interfaceType", label: "Інтерфейс", field: "interfaceType" },
    { key: "capacityGb", label: "Об'єм (ГБ)", field: "capacityGb" },
  ],
  hdd: [
    { key: "capacityTb", label: "Об'єм (ТБ)", field: "capacityTb" },
    { key: "rpm", label: "Обертів за хв.", field: "rpm" },
  ],
  psu: [
    { key: "wattage", label: "Потужність (Вт)", field: "wattage" },
  ],
  case: [
    { key: "supportedFormFactors", label: "Форм-фактори", field: "supportedFormFactors" },
  ],
  air_cooler: [
    { key: "supportedSockets", label: "Сокети", field: "supportedSockets" },
  ],
  water_cooler: [
    { key: "supportedSockets", label: "Сокети", field: "supportedSockets" },
    { key: "radiatorMm", label: "Радіатор (мм)", field: "radiatorMm" },
  ],
  sound_card: [
    { key: "interfaceType", label: "Інтерфейс", field: "interfaceType" },
    { key: "channels", label: "Канали", field: "channels" },
  ],
  network_card: [
    { key: "networkSpeed", label: "Швидкість", field: "networkSpeed" },
    { key: "interfaceType", label: "Інтерфейс", field: "interfaceType" },
  ],
  headset: [
    { key: "connection", label: "Підключення", field: "connection" },
  ],
};

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
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

  // Fetch ALL products in category (for filter options)
  const allProducts = await prisma.product.findMany({
    where: { category, ...(subtype ? { subtype } : {}) },
  });

  // Build filter conditions
  const selectedBrands = sp.brand?.split(",").filter(Boolean) ?? [];
  const minPrice = sp.minPrice ? parseInt(sp.minPrice) : undefined;
  const maxPrice = sp.maxPrice ? parseInt(sp.maxPrice) : undefined;
  const discountOnly = sp.discount === "1";

  let filtered = allProducts;

  // Brand filter
  if (selectedBrands.length > 0) {
    filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
  }

  // Price filter
  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  // Discount filter
  if (discountOnly) {
    filtered = filtered.filter((p) => p.discount !== null);
  }

  // Spec filters
  const specConfigs = SPEC_FILTERS[category] ?? [];
  for (const spec of specConfigs) {
    const values = sp[spec.key]?.split(",").filter(Boolean) ?? [];
    if (values.length > 0) {
      filtered = filtered.filter((p) => {
        const val = (p as any)[spec.field];
        if (val === null || val === undefined) return false;
        const valStr = String(val);
        // For comma-separated fields like supportedFormFactors/supportedSockets
        if (valStr.includes(",")) {
          const parts = valStr.split(",").map((s: string) => s.trim());
          return values.some((v) => parts.includes(v));
        }
        return values.includes(valStr);
      });
    }
  }

  // Sort
  const sortField = Object.keys(orderBy)[0] as string;
  const sortDir = Object.values(orderBy)[0] as string;
  filtered.sort((a, b) => {
    const aVal = (a as any)[sortField];
    const bVal = (b as any)[sortField];
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  // Compute filter options from ALL products (not filtered)
  const brandGroups = Object.entries(
    allProducts.reduce<Record<string, number>>((acc, p) => {
      acc[p.brand] = (acc[p.brand] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([brand, count]) => ({ brand, count }));

  const prices = allProducts.map((p) => p.price);
  const priceRange = { min: Math.min(...prices, 0), max: Math.max(...prices, 0) };

  const hasDiscount = allProducts.some((p) => p.discount !== null);

  // Build spec filter options
  const specFilterData = specConfigs.map((spec) => {
    const valueMap: Record<string, number> = {};
    for (const p of allProducts) {
      const val = (p as any)[spec.field];
      if (val === null || val === undefined) continue;
      const valStr = String(val);
      // Expand comma-separated values
      if (valStr.includes(",")) {
        for (const part of valStr.split(",").map((s: string) => s.trim())) {
          valueMap[part] = (valueMap[part] ?? 0) + 1;
        }
      } else {
        valueMap[valStr] = (valueMap[valStr] ?? 0) + 1;
      }
    }
    return {
      key: spec.key,
      label: spec.label,
      options: Object.entries(valueMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([value, count]) => ({ value, label: value, count })),
    };
  }).filter((g) => g.options.length > 1);

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
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-muted)] mb-4">
        <Link href="/" className="hover:text-[var(--color-foreground)] transition">Головна</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-foreground)]">{CATEGORIES[category]}</span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{CATEGORIES[category]}</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            {filtered.length} товарів
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 text-sm">
          {(Object.keys(SORTS) as SortKey[]).map((key) => {
            const active = sortKey === key;
            return (
              <Link
                key={key}
                href={`/catalog/${category}?${buildQs({ sort: key })}`}
                className={`chip ${active ? "chip-active" : ""}`}
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
            className={`chip ${!subtype ? "chip-active" : ""}`}
          >
            Усі
          </Link>
          {(Object.keys(PERIPHERAL_SUBTYPES) as PeripheralSubtype[]).map((key) => {
            const active = subtype === key;
            return (
              <Link
                key={key}
                href={`/catalog/headset?${buildQs({ subtype: key, brand: undefined })}`}
                className={`chip ${active ? "chip-active" : ""}`}
              >
                {PERIPHERAL_SUBTYPES[key]}
              </Link>
            );
          })}
        </div>
      )}

      <MobileFilterToggle>
        <CatalogFilters
          category={category}
          brands={brandGroups}
          priceRange={priceRange}
          specFilters={specFilterData}
          hasDiscount={hasDiscount}
        />
      </MobileFilterToggle>

      <div className="grid grid-cols-12 gap-6">
        <aside className="hidden md:block md:col-span-3">
          <div className="card p-5 md:sticky md:top-40">
            <CatalogFilters
              category={category}
              brands={brandGroups}
              priceRange={priceRange}
              specFilters={specFilterData}
              hasDiscount={hasDiscount}
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
