"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Clock, MapPin } from "lucide-react";
import SocialIcons from "@/components/SocialIcons";
import { useLang } from "@/components/LangProvider";

export default function FooterClient() {
  const { t } = useLang();

  const shopLinks = [
    { href: "/catalog/cpu", labelKey: "cat.cpu" as const },
    { href: "/catalog/motherboard", labelKey: "cat.motherboard" as const },
    { href: "/catalog/gpu", labelKey: "cat.gpu" as const },
    { href: "/catalog/ram", labelKey: "cat.ram" as const },
    { href: "/catalog/ssd", labelKey: "cat.ssd" as const },
    { href: "/catalog/hdd", labelKey: "cat.hdd" as const },
    { href: "/catalog/psu", labelKey: "cat.psu" as const },
    { href: "/catalog/case", labelKey: "cat.case" as const },
    { href: "/catalog/air_cooler", labelKey: "cat.air_cooler" as const },
    { href: "/catalog/water_cooler", labelKey: "cat.water_cooler" as const },
    { href: "/catalog/sound_card", labelKey: "cat.sound_card" as const },
    { href: "/catalog/network_card", labelKey: "cat.network_card" as const },
    { href: "/catalog/headset", labelKey: "cat.headset" as const },
  ];

  const serviceLinks = [
    { href: "/builder", labelKey: "footer.configurator" as const },
    { href: "/builds", labelKey: "nav.builds" as const },
    { href: "/trade-in", labelKey: "nav.tradein" as const },
    { href: "/sales", labelKey: "nav.sales" as const },
    { href: "/account", labelKey: "footer.account" as const },
  ];

  return (
    <footer className="border-t border-white/10 mt-16 bg-[#111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="RagePC" width={32} height={32} className="w-8 h-8 object-contain" />
              <span className="text-2xl font-black">
                <span className="text-white">Rage</span>
                <span className="text-[var(--color-brand)]">PC</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">{t("footer.desc")}</p>
            <div className="mt-4"><SocialIcons size={20} /></div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.catalog")}</h3>
            <ul className="space-y-2 text-sm text-white/60">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition">{t(l.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.service")}</h3>
            <ul className="space-y-2 text-sm text-white/60">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition">{t(l.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.contacts")}</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[var(--color-brand)] shrink-0" />
                info@ragepc.ua
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-[var(--color-brand)] shrink-0" />
                {t("footer.schedule")}
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[var(--color-brand)] shrink-0" />
                Київ, Україна
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} RagePC. {t("footer.rights")}</div>
          <div className="flex gap-4">
            <span>{t("footer.payment")}</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>{t("footer.shipping")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
