"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Search, Wrench, Layers, Headphones, ArrowLeftRight, Percent, Menu, X,
  ChevronDown, ChevronUp, Cpu, CircuitBoard, MonitorSpeaker, MemoryStick,
  HardDrive, Database, BatteryCharging, Box, Fan, Droplets, AudioLines, Wifi,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/components/LangProvider";
import CatalogDropdown from "@/components/CatalogDropdown";
import type { DictKey } from "@/lib/i18n";

const catalogCategories: { href: string; labelKey: DictKey; icon: LucideIcon }[] = [
  { href: "/catalog/cpu", labelKey: "cat.cpu", icon: Cpu },
  { href: "/catalog/motherboard", labelKey: "cat.motherboard", icon: CircuitBoard },
  { href: "/catalog/gpu", labelKey: "cat.gpu", icon: MonitorSpeaker },
  { href: "/catalog/ram", labelKey: "cat.ram", icon: MemoryStick },
  { href: "/catalog/ssd", labelKey: "cat.ssd", icon: HardDrive },
  { href: "/catalog/hdd", labelKey: "cat.hdd", icon: Database },
  { href: "/catalog/psu", labelKey: "cat.psu", icon: BatteryCharging },
  { href: "/catalog/case", labelKey: "cat.case", icon: Box },
  { href: "/catalog/air_cooler", labelKey: "cat.air_cooler", icon: Fan },
  { href: "/catalog/water_cooler", labelKey: "cat.water_cooler", icon: Droplets },
  { href: "/catalog/sound_card", labelKey: "cat.sound_card", icon: AudioLines },
  { href: "/catalog/network_card", labelKey: "cat.network_card", icon: Wifi },
  { href: "/catalog/headset", labelKey: "cat.headset", icon: Headphones },
];

const navLinks = [
  { href: "/builder", labelKey: "nav.configurator" as const, icon: Wrench },
  { href: "/builds", labelKey: "nav.builds" as const, icon: Layers },
  { href: "/catalog/headset", labelKey: "nav.peripherals" as const, icon: Headphones },
  { href: "/trade-in", labelKey: "nav.tradein" as const, icon: ArrowLeftRight },
  { href: "/sales", labelKey: "nav.sales" as const, icon: Percent },
];

export function HeaderSearch() {
  const { t } = useLang();
  return (
    <div className="flex-1 max-w-xl mx-auto hidden md:flex">
      <div className="relative w-full">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
        />
        <input
          type="text"
          placeholder={t("header.search")}
          className="w-full h-10 pl-10 pr-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-brand)] transition"
        />
      </div>
    </div>
  );
}

export function MobileSearch() {
  const { t } = useLang();
  return (
    <div className="md:hidden px-4 pb-3">
      <div className="relative w-full">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
        />
        <input
          type="text"
          placeholder={t("header.search")}
          className="w-full h-10 pl-10 pr-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-brand)] transition"
        />
      </div>
    </div>
  );
}

export function HeaderTopInfo() {
  const { t } = useLang();
  return (
    <div className="flex items-center gap-4">
      <span>{t("header.delivery")}</span>
      <span className="hidden sm:inline">•</span>
      <span className="hidden sm:inline">{t("header.warranty")}</span>
    </div>
  );
}

export function HeaderNav() {
  const { t } = useLang();
  return (
    <nav className="hidden md:flex items-center gap-1 py-2 text-sm">
      <CatalogDropdown />
      <div className="flex items-center gap-1 overflow-x-auto">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)] transition"
          >
            <item.icon size={16} />
            {t(item.labelKey)}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function MobileCatalogNav({ onClose }: { onClose: () => void }) {
  const [catalogOpen, setCatalogOpen] = useState(true);
  const { t } = useLang();

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto min-h-0">
      {/* Каталог with expandable categories */}
      <button
        onClick={() => setCatalogOpen(!catalogOpen)}
        className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-semibold hover:bg-[var(--color-surface)] transition"
      >
        {t("nav.catalog")}
        {catalogOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {catalogOpen && (
        <div className="ml-2 space-y-0.5">
          {catalogCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition"
            >
              <cat.icon size={16} className="text-[var(--color-brand)]" />
              {t(cat.labelKey)}
            </Link>
          ))}
        </div>
      )}

      <div className="border-t border-[var(--color-border)] my-2" />

      {navLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition"
        >
          <item.icon size={18} />
          {t(item.labelKey)}
        </Link>
      ))}
    </nav>
  );
}

export function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="md:hidden" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2.5 rounded-full hover:bg-[var(--color-surface)] transition"
        aria-label="Menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <>
          <div className="fixed inset-0 bg-black/60 z-[60]" onClick={() => setOpen(false)} />
          <div className="fixed top-0 bottom-0 left-0 w-[280px] bg-[var(--color-background)] z-[70] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              <span className="text-lg font-black">
                <span className="text-[var(--color-foreground)]">Rage</span>
                <span className="text-[var(--color-brand)]">PC</span>
              </span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-[var(--color-surface)] transition">
                <X size={20} />
              </button>
            </div>
            <MobileCatalogNav onClose={() => setOpen(false)} />
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
