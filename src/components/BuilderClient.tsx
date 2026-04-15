"use client";

import { useMemo, useState, useTransition } from "react";
import { AlertTriangle, Check, Cpu, ShoppingCart, X } from "lucide-react";
import {
  BUILD_STEPS,
  EMPTY_BUILD,
  estimateWattage,
  isCompatible,
  totalPrice,
  validateBuild,
  type BuildProduct,
  type BuildSelection,
  type BuildStepKey,
} from "@/lib/compatibility";
import { formatPrice } from "@/lib/categories";
import { addBuildToCart } from "@/app/cart/actions";
import ProductImage from "@/components/ProductImage";

export default function BuilderClient({ products }: { products: BuildProduct[] }) {
  const [build, setBuild] = useState<BuildSelection>(EMPTY_BUILD);
  const [activeStep, setActiveStep] = useState<BuildStepKey>("cpu");
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  const grouped = useMemo(() => {
    const g: Record<string, BuildProduct[]> = {};
    for (const p of products) {
      (g[p.category] ||= []).push(p);
    }
    return g;
  }, [products]);

  const warnings = validateBuild(build);
  const price = totalPrice(build);
  const estWatts = estimateWattage(build);
  const picked = Object.values(build).filter(Boolean) as BuildProduct[];

  function select(step: BuildStepKey, product: BuildProduct | null) {
    setBuild((b) => ({ ...b, [step]: product }));
  }

  function handleAddToCart() {
    const ids = picked.map((p) => p.id);
    if (ids.length === 0) return;
    startTransition(async () => {
      await addBuildToCart(ids);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    });
  }

  const activeList = grouped[activeStep] ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      <div>
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {BUILD_STEPS.map((s) => {
            const selected = build[s.key];
            const active = activeStep === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActiveStep(s.key)}
                className={`px-4 py-2 rounded-md border whitespace-nowrap text-sm transition ${
                  active
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-white"
                    : selected
                      ? "border-[var(--color-border)] bg-[var(--color-surface)] text-white"
                      : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-white"
                }`}
              >
                <span className="font-medium">{s.label}</span>
                {selected && <Check size={14} className="inline ml-1 text-[var(--color-brand)]" />}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {activeList.map((p) => {
            const compat = isCompatible(p, build);
            const isSelected = build[activeStep]?.id === p.id;
            return (
              <button
                key={p.id}
                disabled={!compat.ok && !isSelected}
                onClick={() => select(activeStep, isSelected ? null : p)}
                className={`w-full text-left card p-4 flex items-center gap-4 transition ${
                  isSelected
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5"
                    : !compat.ok
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                }`}
              >
                <ProductImage alt={p.name} brand={p.brand} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[var(--color-muted)]">{p.brand}</div>
                  <div className="font-semibold">{p.name}</div>
                  {!compat.ok && (
                    <div className="text-xs text-[var(--color-brand)] mt-1 flex items-center gap-1">
                      <X size={12} /> {compat.reason}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatPrice(p.price)}</div>
                  {isSelected && (
                    <div className="text-xs text-[var(--color-brand)]">Обрано</div>
                  )}
                </div>
              </button>
            );
          })}
          {activeList.length === 0 && (
            <div className="card p-8 text-center text-[var(--color-muted)]">
              Немає товарів у цій категорії.
            </div>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-32 h-fit space-y-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-3">
            <Cpu size={16} /> Ваша збірка
          </div>
          {picked.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)]">
              Поки нічого не обрано. Почніть з процесора.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {BUILD_STEPS.map((s) => {
                const p = build[s.key];
                if (!p) return null;
                return (
                  <li key={s.key} className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs text-[var(--color-muted)]">{s.label}</div>
                      <div className="truncate">{p.name}</div>
                    </div>
                    <div className="shrink-0 font-medium">{formatPrice(p.price)}</div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="border-t border-[var(--color-border)] mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[var(--color-muted)]">
              <span>Оцінка споживання</span>
              <span>~{estWatts} Вт</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Разом</span>
              <span className="text-[var(--color-brand)]">{formatPrice(price)}</span>
            </div>
          </div>

          <button
            disabled={picked.length === 0 || pending || warnings.length > 0}
            onClick={handleAddToCart}
            className="btn-primary w-full mt-4"
          >
            {added ? (
              <><Check size={16} /> Додано</>
            ) : (
              <><ShoppingCart size={16} /> В кошик</>
            )}
          </button>
        </div>

        {warnings.length > 0 && (
          <div className="card p-4 border-[var(--color-brand)]">
            <div className="flex items-center gap-2 text-[var(--color-brand)] font-semibold">
              <AlertTriangle size={16} /> Проблеми сумісності
            </div>
            <ul className="mt-2 text-sm space-y-1 list-disc pl-5 text-[var(--color-muted)]">
              {warnings.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
