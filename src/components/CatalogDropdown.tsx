"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Cpu,
  MonitorSpeaker,
  HardDrive,
  MemoryStick,
  Fan,
  Box,
  BatteryCharging,
  Headphones,
  ArrowLeftRight,
  CircuitBoard,
  Disc3,
  Database,
  Droplets,
  AudioLines,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/components/LangProvider";
import type { DictKey } from "@/lib/i18n";

const categories: { href: string; labelKey: DictKey; descKey: DictKey; icon: LucideIcon }[] = [
  { href: "/catalog/cpu", labelKey: "cat.cpu", descKey: "cat.cpu.desc", icon: Cpu },
  { href: "/catalog/motherboard", labelKey: "cat.motherboard", descKey: "cat.motherboard.desc", icon: CircuitBoard },
  { href: "/catalog/gpu", labelKey: "cat.gpu", descKey: "cat.gpu.desc", icon: MonitorSpeaker },
  { href: "/catalog/ram", labelKey: "cat.ram", descKey: "cat.ram.desc", icon: MemoryStick },
  { href: "/catalog/ssd", labelKey: "cat.ssd", descKey: "cat.ssd.desc", icon: HardDrive },
  { href: "/catalog/hdd", labelKey: "cat.hdd", descKey: "cat.hdd.desc", icon: Database },
  { href: "/catalog/psu", labelKey: "cat.psu", descKey: "cat.psu.desc", icon: BatteryCharging },
  { href: "/catalog/case", labelKey: "cat.case", descKey: "cat.case.desc", icon: Box },
  { href: "/catalog/air_cooler", labelKey: "cat.air_cooler", descKey: "cat.air_cooler.desc", icon: Fan },
  { href: "/catalog/water_cooler", labelKey: "cat.water_cooler", descKey: "cat.water_cooler.desc", icon: Droplets },
  { href: "/catalog/sound_card", labelKey: "cat.sound_card", descKey: "cat.sound_card.desc", icon: AudioLines },
  { href: "/catalog/network_card", labelKey: "cat.network_card", descKey: "cat.network_card.desc", icon: Wifi },
  { href: "/catalog/headset", labelKey: "cat.headset", descKey: "cat.headset.desc", icon: Headphones },
  { href: "/trade-in", labelKey: "nav.tradein", descKey: "cat.tradein.desc", icon: ArrowLeftRight },
];

export default function CatalogDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap font-medium transition ${
          open
            ? "bg-[var(--color-brand)] text-white"
            : "bg-[var(--color-surface-2)] text-[var(--color-foreground)] hover:bg-[var(--color-brand)]/20"
        }`}
      >
        <LayoutGrid size={16} />
        {t("nav.catalog")}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-[560px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl shadow-black/50 z-50 p-3 grid grid-cols-2 gap-1 animate-scale-in">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-2)] transition group"
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-brand)]/20 transition">
                <cat.icon size={18} className="text-[var(--color-brand)]" />
              </div>
              <div>
                <div className="font-medium text-sm">{t(cat.labelKey)}</div>
                <div className="text-xs text-[var(--color-muted)]">{t(cat.descKey)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
