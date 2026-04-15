import Link from "next/link";
import { Cpu, Zap, Shield, Headphones, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/categories";
import BuildImage from "@/components/BuildImage";

const features = [
  {
    icon: Cpu,
    title: "Розумний конфігуратор",
    text: "Автоматична перевірка сумісності сокетів, пам'яті, БЖ та форм-фактора.",
  },
  {
    icon: Zap,
    title: "Готові збірки",
    text: "Протестовані конфігурації для 1080p, 1440p та 4K-геймінгу.",
  },
  {
    icon: Headphones,
    title: "Ігрова периферія",
    text: "Навушники, миші та клавіатури від перевірених брендів.",
  },
  {
    icon: Shield,
    title: "Гарантія 2 роки",
    text: "На кожну зібрану конфігурацію та фірмову периферію.",
  },
];

const categories = [
  { href: "/catalog/cpu", label: "Процесори" },
  { href: "/catalog/gpu", label: "Відеокарти" },
  { href: "/catalog/motherboard", label: "Материнські плати" },
  { href: "/catalog/ram", label: "Оперативна пам'ять" },
  { href: "/catalog/psu", label: "Блоки живлення" },
  { href: "/catalog/case", label: "Корпуси" },
  { href: "/catalog/cooler", label: "Охолодження" },
  { href: "/catalog/headset", label: "Периферія" },
];

export default async function Home() {
  const builds = await prisma.prebuiltBuild.findMany({
    orderBy: { createdAt: "asc" },
    take: 3,
    include: { components: { include: { product: true } } },
  });

  return (
    <div>
      <section className="relative border-b border-[var(--color-border)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(600px circle at 80% 30%, rgba(220,38,38,0.4), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight max-w-3xl">
            Збери ПК своєї
            <span className="text-[var(--color-brand)]"> люті</span>.
          </h1>
          <p className="mt-6 text-lg text-[var(--color-muted)] max-w-xl">
            RagePC — це розумний конфігуратор, перевірені комплектуючі та
            ігрова периферія. Жодної несумісності, жодних компромісів.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/builder" className="btn-primary">
              <Cpu size={18} /> Відкрити конфігуратор
            </Link>
            <Link href="/catalog/cpu" className="btn-ghost">
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">Чому RagePC</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card p-5">
              <f.icon className="text-[var(--color-brand)]" size={24} />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Готові збірки</h2>
          <Link href="/builds" className="text-sm text-[var(--color-brand)] hover:underline inline-flex items-center gap-1">
            Усі збірки <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {builds.map((b) => {
            const total = b.components.reduce((s, c) => s + c.product.price, 0);
            return (
              <Link key={b.id} href={`/builds/${b.slug}`} className="card p-0 overflow-hidden flex flex-col">
                <BuildImage
                  src={b.image}
                  alt={b.name}
                  tier={b.tier}
                  aspect="video"
                  className="rounded-none"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs uppercase tracking-wider text-[var(--color-brand)] font-bold">
                    {b.tier}
                  </div>
                  <div className="text-xl font-bold mt-1">{b.name}</div>
                  <div className="text-sm text-[var(--color-muted)] mt-1">{b.tagline}</div>
                  <div className="mt-4 text-2xl font-black text-[var(--color-brand)]">
                    {formatPrice(total)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">Категорії</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="card p-5 text-center">
              <div className="font-medium">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
