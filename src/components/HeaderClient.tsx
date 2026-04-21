"use client";

import Link from "next/link";
import { Search, Wrench, Layers, Headphones, ArrowLeftRight, Percent } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import CatalogDropdown from "@/components/CatalogDropdown";

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
    <nav className="flex items-center gap-1 py-2 text-sm">
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
