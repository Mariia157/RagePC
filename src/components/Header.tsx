import Link from "next/link";
import { ShoppingCart, User, Cpu } from "lucide-react";
import { getCartCount } from "@/lib/cart";

const nav = [
  { href: "/catalog/cpu", label: "Процесори" },
  { href: "/catalog/gpu", label: "Відеокарти" },
  { href: "/catalog/motherboard", label: "Мат. плати" },
  { href: "/catalog/ram", label: "ОЗП" },
  { href: "/catalog/psu", label: "БЖ" },
  { href: "/catalog/case", label: "Корпуси" },
  { href: "/catalog/cooler", label: "Охолодження" },
  { href: "/catalog/headset", label: "Периферія" },
];

export default async function Header() {
  const cartCount = await getCartCount();
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-black/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-white">Rage</span>
              <span className="text-[var(--color-brand)]">PC</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/builds"
              className="btn-ghost h-9 px-4 text-sm inline-flex items-center"
            >
              Готові збірки
            </Link>
            <Link
              href="/builder"
              className="btn-primary h-9 px-4 text-sm inline-flex items-center gap-2"
            >
              <Cpu size={16} /> Зібрати ПК
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/account"
              aria-label="Особистий кабінет"
              className="p-2 rounded-md hover:bg-[var(--color-surface)] transition"
            >
              <User size={20} />
            </Link>
            <Link
              href="/cart"
              aria-label="Кошик"
              className="p-2 rounded-md hover:bg-[var(--color-surface)] transition relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-brand)] text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto pb-2 text-sm text-[var(--color-muted)]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded whitespace-nowrap hover:text-white hover:bg-[var(--color-surface)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
