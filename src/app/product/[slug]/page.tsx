import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CATEGORIES, formatPrice, calcDiscountedPrice, type Category } from "@/lib/categories";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";
import FavoriteButton from "@/components/FavoriteButton";
import { Check, Truck, Shield } from "lucide-react";

function buildSpecs(p: Awaited<ReturnType<typeof prisma.product.findUnique>>) {
  if (!p) return [] as { label: string; value: string }[];
  const specs: { label: string; value: string }[] = [];
  const push = (label: string, value: unknown, suffix = "") => {
    if (value !== null && value !== undefined && value !== "")
      specs.push({ label, value: `${value}${suffix}` });
  };
  push("Сокет", p.socket);
  push("TDP", p.tdp, " Вт");
  push("Ядра", p.cores);
  push("Потоки", p.threads);
  push("Базова частота", p.baseClockGhz, " ГГц");
  push("Довжина відеокарти", p.gpuLengthMm, " мм");
  push("Енергоспоживання", p.gpuPowerDraw, " Вт");
  push("Відеопам'ять", p.vramGb, " ГБ");
  push("Тип пам'яті", p.ramType);
  push("Частота пам'яті", p.ramSpeedMhz, " МГц");
  push("Обсяг пам'яті", p.ramCapacityGb, " ГБ");
  push("Форм-фактор", p.formFactor);
  push("Підтримка форм-факторів", p.supportedFormFactors);
  push("Макс. довжина GPU", p.maxGpuLengthMm, " мм");
  push("Потужність", p.wattage, " Вт");
  push("Підтримка сокетів", p.supportedSockets);
  push("Макс. TDP охолодження", p.maxTdp, " Вт");
  push("Підключення", p.connection);
  push("Імпеданс", p.impedanceOhm, " Ом");
  push("Об'єм", p.capacityGb, " ГБ");
  push("Швидкість читання", p.readSpeedMBs, " МБ/с");
  push("Швидкість запису", p.writeSpeedMBs, " МБ/с");
  push("Інтерфейс", p.interfaceType);
  push("Об'єм", p.capacityTb, " ТБ");
  push("Обертів за хв.", p.rpm);
  push("Кеш", p.cacheMb, " МБ");
  push("Радіатор", p.radiatorMm, " мм");
  push("Канали", p.channels);
  push("Частота дискретизації", p.sampleRateKhz, " кГц");
  push("Розрядність", p.bitDepth, " біт");
  push("Швидкість мережі", p.networkSpeed);
  push("Wi-Fi", p.wireless ? "Так" : p.wireless === false ? "Ні" : null);
  return specs;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  const specs = buildSpecs(product);
  const category = product.category as Category;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-sm text-[var(--color-muted)] mb-6">
        <Link href="/" className="hover:text-white transition">Головна</Link>
        <span className="mx-2">/</span>
        <Link href={`/catalog/${category}`} className="hover:text-white transition">
          {CATEGORIES[category] ?? category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-6">
          <ProductImage
            src={product.image}
            alt={product.name}
            brand={product.brand}
            size="xl"
            className="rounded-xl"
          />
        </div>

        <div>
          <div className="text-sm text-[var(--color-muted)] uppercase tracking-wider font-medium">
            {product.brand}
          </div>
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="text-4xl font-black text-[var(--color-brand)]">
              {formatPrice(calcDiscountedPrice(product.price, product.discount))}
            </div>
            {product.discount && (
              <>
                <div className="text-lg text-[var(--color-muted)] line-through">
                  {formatPrice(product.price)}
                </div>
                <span className="bg-[var(--color-brand)] text-white text-sm font-bold px-2.5 py-0.5 rounded-full">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-[var(--color-success)]">
                <Check size={14} /> В наявності ({product.stock} шт.)
              </span>
            ) : (
              <span className="text-[var(--color-muted)]">Немає в наявності</span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <AddToCartButton productId={product.id} disabled={product.stock <= 0} />
            <FavoriteButton productId={product.id} className="w-11 h-11" />
          </div>

          {/* Delivery info */}
          <div className="mt-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck size={18} className="text-[var(--color-brand)] shrink-0" />
              <div>
                <div className="font-medium">Доставка</div>
                <div className="text-[var(--color-muted)]">Нова Пошта, Укрпошта — від 1 дня</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={18} className="text-[var(--color-brand)] shrink-0" />
              <div>
                <div className="font-medium">Гарантія</div>
                <div className="text-[var(--color-muted)]">Офіційна гарантія 24 місяці</div>
              </div>
            </div>
          </div>

          {specs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Характеристики</h2>
              <dl className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] divide-y divide-[var(--color-border)] overflow-hidden">
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between px-4 py-3 text-sm">
                    <dt className="text-[var(--color-muted)]">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
