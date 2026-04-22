import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCart, getCartCount } from "@/lib/cart";
import CartDropdown from "@/components/CartDropdown";
import FavoritesDropdown from "@/components/FavoritesDropdown";
import SocialIcons from "@/components/SocialIcons";
import ThemeToggle from "@/components/ThemeToggle";
import LangSwitcher from "@/components/LangSwitcher";
import { HeaderSearch, MobileSearch, HeaderTopInfo, HeaderNav, MobileMenuButton } from "@/components/HeaderClient";

export default async function Header() {
  const [cartItems, cartCount, allProducts] = await Promise.all([
    getCart(),
    getCartCount(),
    prisma.product.findMany({
      select: { id: true, slug: true, name: true, brand: true, price: true, discount: true, image: true },
    }),
  ]);

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md">
      {/* Top bar — hidden on mobile */}
      <div className="border-b border-[var(--color-border)] hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-10 text-xs text-[var(--color-muted)]">
          <HeaderTopInfo />
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <SocialIcons size={14} />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 flex items-center gap-3 md:gap-4 h-14 md:h-16">
          <MobileMenuButton />

          <Link href="/#top" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="RagePC"
              width={36}
              height={36}
              className="w-8 h-8 md:w-9 md:h-9 object-contain"
            />
            <span className="text-xl md:text-2xl font-black tracking-tight">
              <span className="text-[var(--color-foreground)]">Rage</span>
              <span className="text-[var(--color-brand)]">PC</span>
            </span>
          </Link>

          <HeaderSearch />

          <div className="flex items-center gap-0.5 md:gap-1 ml-auto">
            <Link
              href="/account"
              aria-label="Account"
              className="p-2 md:p-2.5 rounded-full hover:bg-[var(--color-surface)] transition"
            >
              <User size={20} />
            </Link>
            <FavoritesDropdown products={allProducts} />
            <CartDropdown items={cartItems as any} count={cartCount} />
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-b border-[var(--color-border)] md:hidden">
        <MobileSearch />
      </div>

      {/* Desktop navigation */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/50 relative hidden md:block">
        <div className="mx-auto max-w-7xl px-4">
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
