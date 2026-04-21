"use client";

import Link from "next/link";
import {
  Cpu, Zap, Shield, Headphones, ArrowRight, MonitorSpeaker,
  HardDrive, MemoryStick, Fan, Box, BatteryCharging, Truck, BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { formatPrice } from "@/lib/categories";
import ProductCardWithPopup from "@/components/ProductCardWithPopup";
import BuildCardWithPopup from "@/components/BuildCardWithPopup";
import type { DictKey } from "@/lib/i18n";

const featureKeys: { icon: LucideIcon; titleKey: DictKey; textKey: DictKey }[] = [
  { icon: Cpu, titleKey: "feature.configurator", textKey: "feature.configurator.desc" },
  { icon: Zap, titleKey: "feature.builds", textKey: "feature.builds.desc" },
  { icon: Headphones, titleKey: "feature.peripherals", textKey: "feature.peripherals.desc" },
  { icon: Shield, titleKey: "feature.warranty2", textKey: "feature.warranty2.desc" },
];

const catItems: { href: string; labelKey: DictKey; icon: LucideIcon; color: string }[] = [
  { href: "/catalog/cpu", labelKey: "cat.cpu", icon: Cpu, color: "from-blue-500/20 to-blue-900/10" },
  { href: "/catalog/gpu", labelKey: "cat.gpu", icon: MonitorSpeaker, color: "from-green-500/20 to-green-900/10" },
  { href: "/catalog/motherboard", labelKey: "cat.motherboard", icon: HardDrive, color: "from-purple-500/20 to-purple-900/10" },
  { href: "/catalog/ram", labelKey: "cat.ram", icon: MemoryStick, color: "from-yellow-500/20 to-yellow-900/10" },
  { href: "/catalog/psu", labelKey: "cat.psu", icon: BatteryCharging, color: "from-orange-500/20 to-orange-900/10" },
  { href: "/catalog/case", labelKey: "cat.case", icon: Box, color: "from-pink-500/20 to-pink-900/10" },
  { href: "/catalog/cooler", labelKey: "cat.cooler", icon: Fan, color: "from-cyan-500/20 to-cyan-900/10" },
  { href: "/catalog/headset", labelKey: "cat.headset", icon: Headphones, color: "from-red-500/20 to-red-900/10" },
];

const benefitKeys: { icon: LucideIcon; titleKey: DictKey; textKey: DictKey }[] = [
  { icon: Truck, titleKey: "benefit.delivery", textKey: "benefit.delivery.desc" },
  { icon: Shield, titleKey: "benefit.warranty", textKey: "benefit.warranty.desc" },
  { icon: BadgeCheck, titleKey: "benefit.original", textKey: "benefit.original.desc" },
  { icon: Zap, titleKey: "benefit.fast", textKey: "benefit.fast.desc" },
];

export default function HomeClient({ builds, popularProducts }: { builds: any[]; popularProducts: any[] }) {
  const { t } = useLang();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(800px circle at 80% 20%, rgba(220,38,38,0.5), transparent 60%), radial-gradient(600px circle at 20% 80%, rgba(220,38,38,0.15), transparent 50%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 badge bg-[var(--color-brand)]/15 text-[var(--color-brand)] mb-6">
              <Zap size={14} /> {t("home.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              {t("home.hero.title1")}
              <span className="text-[var(--color-brand)]">{t("home.hero.title2")}</span>.
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)] leading-relaxed">{t("home.hero.desc")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/builder" className="btn-primary text-base px-6 py-3 rounded-full">
                <Cpu size={18} /> {t("home.openConfigurator")}
              </Link>
              <Link href="/catalog/cpu" className="btn-ghost text-base px-6 py-3 rounded-full">
                {t("home.goToCatalog")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]/50">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {benefitKeys.map((b) => (
              <div key={b.titleKey} className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
                  <b.icon size={18} className="text-[var(--color-brand)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t(b.titleKey)}</div>
                  <div className="text-xs text-[var(--color-muted)]">{t(b.textKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t("home.catalog")}</h2>
          <Link href="/catalog/cpu" className="text-sm text-[var(--color-brand)] hover:underline inline-flex items-center gap-1">
            {t("home.allCategories")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {catItems.map((c) => (
            <Link key={c.href} href={c.href} className="group relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 flex flex-col items-center gap-3 text-center hover:border-[var(--color-brand)] transition-all hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative w-12 h-12 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center">
                <c.icon size={22} className="text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition" />
              </div>
              <span className="relative font-medium text-sm">{t(c.labelKey)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t("home.popular")}</h2>
          <Link href="/catalog/gpu" className="text-sm text-[var(--color-brand)] hover:underline inline-flex items-center gap-1">
            {t("home.viewAll")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularProducts.map((p: any) => <ProductCardWithPopup key={p.id} product={p} />)}
        </div>
      </section>

      {/* Builds */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t("home.readyBuilds")}</h2>
          <Link href="/builds" className="text-sm text-[var(--color-brand)] hover:underline inline-flex items-center gap-1">
            {t("home.allBuilds")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {builds.map((b: any) => <BuildCardWithPopup key={b.id} build={b} />)}
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">{t("home.whyTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureKeys.map((f) => (
            <div key={f.titleKey} className="card p-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                <f.icon className="text-[var(--color-brand)]" size={24} />
              </div>
              <h3 className="mt-4 font-semibold">{t(f.titleKey)}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{t(f.textKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--color-brand-dim)] to-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-12">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(400px circle at 90% 50%, rgba(220,38,38,0.5), transparent 60%)" }} />
          <div className="relative max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold">{t("home.ctaTitle")}</h2>
            <p className="mt-3 text-[var(--color-muted)]">{t("home.ctaDesc")}</p>
            <Link href="/builder" className="mt-6 btn-primary inline-flex text-base px-6 py-3 rounded-full">
              <Cpu size={18} /> {t("home.tryConfigurator")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
