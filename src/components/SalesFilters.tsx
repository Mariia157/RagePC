"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, X } from "lucide-react";

type Props = {
  brands: { brand: string; count: number }[];
  categories: { category: string; label: string; count: number }[];
  priceRange: { min: number; max: number };
};

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--color-border)] pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold mb-2"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && children}
    </div>
  );
}

export default function SalesFilters({ brands, categories, priceRange }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrands = searchParams.get("brand")?.split(",").filter(Boolean) ?? [];
  const currentCategories = searchParams.get("category")?.split(",").filter(Boolean) ?? [];
  const currentMinPrice = searchParams.get("minPrice") ?? "";
  const currentMaxPrice = searchParams.get("maxPrice") ?? "";

  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  function buildUrl(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(overrides)) {
      if (v) params.set(k, v);
      else params.delete(k);
    }
    return `/sales?${params.toString()}`;
  }

  function toggleBrand(brand: string) {
    const next = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    router.push(buildUrl({ brand: next.length ? next.join(",") : undefined }));
  }

  function toggleCategory(cat: string) {
    const next = currentCategories.includes(cat)
      ? currentCategories.filter((c) => c !== cat)
      : [...currentCategories, cat];
    router.push(buildUrl({ category: next.length ? next.join(",") : undefined }));
  }

  function applyPrice() {
    router.push(
      buildUrl({
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      })
    );
  }

  function clearAll() {
    router.push("/sales");
  }

  const hasActiveFilters =
    currentBrands.length > 0 ||
    currentCategories.length > 0 ||
    currentMinPrice ||
    currentMaxPrice;

  return (
    <div className="space-y-0">
      {hasActiveFilters && (
        <div className="mb-4">
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-xs text-[var(--color-brand)] hover:underline"
          >
            <X size={14} />
            Скинути фільтри
          </button>
        </div>
      )}

      {/* Price */}
      <FilterSection title="Ціна">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={`${priceRange.min}`}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyPrice()}
            className="w-full h-9 px-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-brand)] transition"
          />
          <span className="text-[var(--color-muted)] text-sm">—</span>
          <input
            type="number"
            placeholder={`${priceRange.max}`}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyPrice()}
            className="w-full h-9 px-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-brand)] transition"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2 w-full h-8 text-xs font-semibold rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)] hover:bg-[var(--color-brand)]/20 transition"
        >
          OK
        </button>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Категорія">
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto text-sm">
          {categories.map((c) => (
            <label key={c.category} className="flex items-center gap-2 px-1 py-1 rounded-lg cursor-pointer hover:bg-[var(--color-surface-2)] transition">
              <input
                type="checkbox"
                checked={currentCategories.includes(c.category)}
                onChange={() => toggleCategory(c.category)}
                className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
              />
              <span className="flex-1 text-[var(--color-muted)]">{c.label}</span>
              <span className="text-xs bg-[var(--color-surface-2)] px-2 py-0.5 rounded-full">{c.count}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Бренд">
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto text-sm">
          {brands.map((b) => (
            <label key={b.brand} className="flex items-center gap-2 px-1 py-1 rounded-lg cursor-pointer hover:bg-[var(--color-surface-2)] transition">
              <input
                type="checkbox"
                checked={currentBrands.includes(b.brand)}
                onChange={() => toggleBrand(b.brand)}
                className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
              />
              <span className="flex-1 text-[var(--color-muted)]">{b.brand}</span>
              <span className="text-xs bg-[var(--color-surface-2)] px-2 py-0.5 rounded-full">{b.count}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
