"use client";

import { useMemo, useState, useTransition, useRef } from "react";
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

function getSpecs(p: BuildProduct): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = [];
  if (p.socket) specs.push({ label: "Сокет", value: p.socket });
  if (p.tdp) specs.push({ label: "TDP", value: `${p.tdp} Вт` });
  if (p.gpuLengthMm) specs.push({ label: "Довжина", value: `${p.gpuLengthMm} мм` });
  if (p.gpuPowerDraw) specs.push({ label: "Споживання", value: `${p.gpuPowerDraw} Вт` });
  if (p.ramType) specs.push({ label: "Тип", value: p.ramType });
  if (p.formFactor) specs.push({ label: "Форм-фактор", value: p.formFactor });
  if (p.wattage) specs.push({ label: "Потужність", value: `${p.wattage} Вт` });
  if (p.supportedSockets) specs.push({ label: "Сокети", value: p.supportedSockets });
  if (p.maxTdp) specs.push({ label: "Макс. TDP", value: `${p.maxTdp} Вт` });
  if (p.maxGpuLengthMm) specs.push({ label: "Макс. GPU", value: `${p.maxGpuLengthMm} мм` });
  if (p.supportedFormFactors) specs.push({ label: "Форм-фактори", value: p.supportedFormFactors });
  return specs.slice(0, 5);
}

function BuilderCard({
  product,
  isSelected,
  disabled,
  reason,
  onSelect,
}: {
  product: BuildProduct;
  isSelected: boolean;
  disabled: boolean;
  reason?: string;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const specs = getSpecs(product);

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHovered(true), 300);
  }

  function handleMouseLeave() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHovered(false), 200);
  }

  return (
    <div
      className={`relative ${hovered ? "z-50" : "z-0"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        disabled={disabled}
        onClick={onSelect}
        className={`w-full text-left bg-[var(--color-surface)] border flex flex-col h-full transition-all duration-200 ${
          hovered
            ? `rounded-t-2xl rounded-b-none border-b-0 ${isSelected ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5" : "border-[var(--color-brand)]"} shadow-2xl shadow-black/40 -translate-y-1`
            : `rounded-2xl ${
                isSelected
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-lg shadow-[var(--color-brand)]/10 -translate-y-1"
                  : disabled
                    ? "border-[var(--color-border)] opacity-40 cursor-not-allowed"
                    : "border-[var(--color-border)] hover:border-[var(--color-brand)] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
              }`
        }`}
      >
        <div className="p-4 pb-2 relative">
          {isSelected && (
            <span className="absolute top-3 right-3 z-10 w-7 h-7 bg-[var(--color-brand)] rounded-full flex items-center justify-center">
              <Check size={14} className="text-white" />
            </span>
          )}
          <ProductImage
            alt={product.name}
            brand={product.brand}
            size="lg"
            className="rounded-xl"
          />
        </div>
        <div className="px-4 pb-4 flex-1 flex flex-col">
          <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-medium">
            {product.brand}
          </div>
          <div className="font-semibold text-sm mt-1 line-clamp-2 leading-snug">
            {product.name}
          </div>
          {reason && (
            <div className="text-xs text-[var(--color-brand)] mt-2 flex items-center gap-1">
              <X size={12} /> {reason}
            </div>
          )}
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="text-lg font-bold text-[var(--color-brand)]">
              {formatPrice(product.price)}
            </div>
            {isSelected && (
              <span className="text-xs font-semibold text-[var(--color-brand)]">Обрано</span>
            )}
          </div>
        </div>
      </button>

      {hovered && (
        <div className="absolute left-0 right-0 top-full z-50 animate-in">
          <div className={`bg-[var(--color-surface)] border border-t-0 ${isSelected ? "border-[var(--color-brand)]" : "border-[var(--color-brand)]"} rounded-b-2xl shadow-2xl shadow-black/50 p-4`}>
            {specs.length > 0 && (
              <div className="space-y-1.5 mb-3">
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between text-xs">
                    <span className="text-[var(--color-muted)]">{s.label}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            <button
              disabled={disabled}
              onClick={onSelect}
              className={`w-full text-sm py-2 rounded-full font-semibold transition ${
                isSelected
                  ? "bg-[var(--color-surface-2)] text-white hover:bg-[var(--color-border)]"
                  : "btn-primary"
              }`}
            >
              {isSelected ? "Прибрати зі збірки" : "Обрати для збірки"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
                className={`px-4 py-2 rounded-full border whitespace-nowrap text-sm transition ${
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeList.map((p) => {
            const compat = isCompatible(p, build);
            const isSelected = build[activeStep]?.id === p.id;
            return (
              <BuilderCard
                key={p.id}
                product={p}
                isSelected={isSelected}
                disabled={!compat.ok && !isSelected}
                reason={!compat.ok ? compat.reason : undefined}
                onSelect={() => select(activeStep, isSelected ? null : p)}
              />
            );
          })}
          {activeList.length === 0 && (
            <div className="col-span-full rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-12 text-center text-[var(--color-muted)]">
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
            className="btn-primary w-full mt-4 rounded-full"
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
