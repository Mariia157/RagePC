"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/categories";
import BuildImage from "@/components/BuildImage";
import { useLang } from "@/components/LangProvider";
import type { DictKey } from "@/lib/i18n";

const CAT_KEYS: Record<string, DictKey> = {
  cpu: "build.catLabels.cpu",
  gpu: "build.catLabels.gpu",
  motherboard: "build.catLabels.motherboard",
  ram: "build.catLabels.ram",
  psu: "build.catLabels.psu",
  case: "build.catLabels.case",
  air_cooler: "build.catLabels.air_cooler",
  water_cooler: "build.catLabels.water_cooler",
};

type BuildData = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  tier: string;
  image: string | null;
  components: {
    product: {
      name: string;
      category: string;
      price: number;
    };
  }[];
};

export default function BuildCardWithPopup({ build }: { build: BuildData }) {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const { t } = useLang();

  const total = build.components.reduce((s, c) => s + c.product.price, 0);

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
      <Link
        href={`/builds/${build.slug}`}
        className={`block bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden flex flex-col h-full transition-all duration-200 ${
          hovered
            ? "rounded-t-2xl rounded-b-none border-b-0 border-[var(--color-brand)] shadow-2xl shadow-black/40 translate-y-[-2px]"
            : "rounded-2xl hover:border-[var(--color-brand)] hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/30"
        }`}
      >
        <BuildImage
          src={build.image}
          alt={build.name}
          tier={build.tier}
          aspect="video"
          className="rounded-none"
        />
        <div className="p-4 flex-1 flex flex-col">
          <div className="inline-flex self-start px-2 py-0.5 rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand)] text-[10px] font-semibold uppercase tracking-wider">
            {build.tier}
          </div>
          <div className="text-base font-bold mt-2">{build.name}</div>
          <div className="text-xs text-[var(--color-muted)] mt-1 line-clamp-2">
            {build.tagline}
          </div>
          <div className="mt-auto pt-3 text-xl font-black text-[var(--color-brand)]">
            {formatPrice(total)}
          </div>
        </div>
      </Link>

      {hovered && (
        <div className="absolute left-0 right-0 top-full z-50 animate-in">
          <div className="bg-[var(--color-surface)] border border-t-0 border-[var(--color-brand)] rounded-b-2xl shadow-2xl shadow-black/50 p-4">
            <div className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
              {t("build.config")}
            </div>
            <div className="space-y-1.5">
              {build.components.map((c) => (
                <div key={c.product.name} className="flex justify-between text-xs gap-2">
                  <span className="text-[var(--color-muted)] shrink-0">
                    {CAT_KEYS[c.product.category] ? t(CAT_KEYS[c.product.category]) : c.product.category}
                  </span>
                  <span className="font-medium text-right truncate">
                    {c.product.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs text-[var(--color-muted)]">{t("build.total")}</span>
              <span className="font-bold text-[var(--color-brand)]">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
