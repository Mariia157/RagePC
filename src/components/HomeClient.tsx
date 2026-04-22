"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Cpu, Zap, Shield, Headphones, ArrowRight, MonitorSpeaker,
  HardDrive, MemoryStick, Fan, Box, BatteryCharging, Truck, BadgeCheck,
  CircuitBoard, Database, Droplets, AudioLines, Wifi,
  Mouse, Keyboard, Monitor, Wrench, Percent, Layers, Sparkles, LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/components/LangProvider";
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
  { href: "/catalog/motherboard", labelKey: "cat.motherboard", icon: CircuitBoard, color: "from-purple-500/20 to-purple-900/10" },
  { href: "/catalog/gpu", labelKey: "cat.gpu", icon: MonitorSpeaker, color: "from-green-500/20 to-green-900/10" },
  { href: "/catalog/ram", labelKey: "cat.ram", icon: MemoryStick, color: "from-yellow-500/20 to-yellow-900/10" },
  { href: "/catalog/ssd", labelKey: "cat.ssd", icon: HardDrive, color: "from-indigo-500/20 to-indigo-900/10" },
  { href: "/catalog/hdd", labelKey: "cat.hdd", icon: Database, color: "from-slate-500/20 to-slate-900/10" },
  { href: "/catalog/psu", labelKey: "cat.psu", icon: BatteryCharging, color: "from-orange-500/20 to-orange-900/10" },
  { href: "/catalog/case", labelKey: "cat.case", icon: Box, color: "from-pink-500/20 to-pink-900/10" },
  { href: "/catalog/air_cooler", labelKey: "cat.air_cooler", icon: Fan, color: "from-cyan-500/20 to-cyan-900/10" },
  { href: "/catalog/water_cooler", labelKey: "cat.water_cooler", icon: Droplets, color: "from-sky-500/20 to-sky-900/10" },
  { href: "/catalog/sound_card", labelKey: "cat.sound_card", icon: AudioLines, color: "from-violet-500/20 to-violet-900/10" },
  { href: "/catalog/network_card", labelKey: "cat.network_card", icon: Wifi, color: "from-emerald-500/20 to-emerald-900/10" },
  { href: "/catalog/headset", labelKey: "cat.headset", icon: Headphones, color: "from-red-500/20 to-red-900/10" },
];

type PopularQuery = {
  href: string;
  labelKey: DictKey;
  icon?: LucideIcon;
  brandLogo?: string;
};

const popularQueries: PopularQuery[] = [
  { href: "/catalog/gpu?brand=NVIDIA", labelKey: "home.pq.gpuNvidia", brandLogo: "NVIDIA" },
  { href: "/catalog/cpu?brand=Intel", labelKey: "home.pq.cpuIntel", brandLogo: "intel" },
  { href: "/catalog/motherboard?socket=LGA1700", labelKey: "home.pq.mbIntel", icon: CircuitBoard },
  { href: "/catalog/ram?ramType=DDR5", labelKey: "home.pq.ramDdr5", icon: MemoryStick },
  { href: "/catalog/gpu?brand=AMD", labelKey: "home.pq.gpuAmd", brandLogo: "AMD" },
  { href: "/catalog/cpu?brand=AMD", labelKey: "home.pq.cpuAmd", brandLogo: "AMD RYZEN" },
  { href: "/catalog/motherboard?socket=AM5", labelKey: "home.pq.mbAmd", icon: CircuitBoard },
  { href: "/builds", labelKey: "home.pq.gamingPc", icon: Monitor },
  { href: "/catalog/headset?subtype=mouse", labelKey: "home.pq.gamingMice", icon: Mouse },
  { href: "/catalog/headset?subtype=keyboard", labelKey: "home.pq.gamingKeyboards", icon: Keyboard },
  { href: "/catalog/headset?subtype=headphones", labelKey: "home.pq.gamingHeadsets", icon: Headphones },
  { href: "/builder", labelKey: "nav.configurator", icon: Wrench },
];

const benefitKeys: { icon: LucideIcon; titleKey: DictKey; textKey: DictKey }[] = [
  { icon: Truck, titleKey: "benefit.delivery", textKey: "benefit.delivery.desc" },
  { icon: Shield, titleKey: "benefit.warranty", textKey: "benefit.warranty.desc" },
  { icon: BadgeCheck, titleKey: "benefit.original", textKey: "benefit.original.desc" },
  { icon: Zap, titleKey: "benefit.fast", textKey: "benefit.fast.desc" },
];

export default function HomeClient({ builds }: { builds: any[] }) {
  const { t } = useLang();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(800px circle at 80% 20%, rgba(220,38,38,0.5), transparent 60%), radial-gradient(600px circle at 20% 80%, rgba(220,38,38,0.15), transparent 50%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
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
            <div className="hidden md:flex justify-center">
              <Image
                src="/products/hero-pc.png"
                alt="Gaming PC"
                width={500}
                height={500}
                className="drop-shadow-[0_0_40px_rgba(220,38,38,0.3)] object-contain"
                priority
              />
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

      {/* Popular queries */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">{t("home.popularQueries")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {popularQueries.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:bg-[var(--color-surface-2)] transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-2)] flex items-center justify-center shrink-0 overflow-hidden">
                {q.brandLogo ? (
                  <span className="text-[10px] font-black leading-tight text-center text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition">
                    {q.brandLogo}
                  </span>
                ) : q.icon ? (
                  <q.icon size={20} className="text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition" />
                ) : null}
              </div>
              <span className="text-sm font-medium">{t(q.labelKey)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick nav carousel */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          <Link
            href="/sales"
            className="snap-start shrink-0 w-[260px] md:w-auto md:flex-1 group relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6 flex items-center gap-4 hover:border-[var(--color-brand)] transition-all bg-gradient-to-r from-red-500/10 to-transparent"
          >
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand)]/15 flex items-center justify-center shrink-0">
              <Percent size={24} className="text-[var(--color-brand)]" />
            </div>
            <div>
              <div className="font-semibold">{t("nav.sales")}</div>
              <div className="text-xs text-[var(--color-muted)] mt-0.5">{t("sales.count")}</div>
            </div>
            <ArrowRight size={18} className="ml-auto text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition shrink-0" />
          </Link>

          <Link
            href="/catalog/cpu"
            className="snap-start shrink-0 w-[260px] md:w-auto md:flex-1 group relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6 flex items-center gap-4 hover:border-[var(--color-brand)] transition-all bg-gradient-to-r from-blue-500/10 to-transparent"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center shrink-0">
              <LayoutGrid size={24} className="text-blue-400" />
            </div>
            <div>
              <div className="font-semibold">{t("home.catalog")}</div>
              <div className="text-xs text-[var(--color-muted)] mt-0.5">{t("home.allCategories")}</div>
            </div>
            <ArrowRight size={18} className="ml-auto text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition shrink-0" />
          </Link>

          <Link
            href="/catalog/gpu?sort=popular"
            className="snap-start shrink-0 w-[260px] md:w-auto md:flex-1 group relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6 flex items-center gap-4 hover:border-[var(--color-brand)] transition-all bg-gradient-to-r from-amber-500/10 to-transparent"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <Sparkles size={24} className="text-amber-400" />
            </div>
            <div>
              <div className="font-semibold">Новинки</div>
              <div className="text-xs text-[var(--color-muted)] mt-0.5">Нові надходження</div>
            </div>
            <ArrowRight size={18} className="ml-auto text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition shrink-0" />
          </Link>

          <Link
            href="/builds"
            className="snap-start shrink-0 w-[260px] md:w-auto md:flex-1 group relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6 flex items-center gap-4 hover:border-[var(--color-brand)] transition-all bg-gradient-to-r from-green-500/10 to-transparent"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/15 flex items-center justify-center shrink-0">
              <Layers size={24} className="text-green-400" />
            </div>
            <div>
              <div className="font-semibold">{t("home.readyBuilds")}</div>
              <div className="text-xs text-[var(--color-muted)] mt-0.5">{t("home.allBuilds")}</div>
            </div>
            <ArrowRight size={18} className="ml-auto text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition shrink-0" />
          </Link>
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
