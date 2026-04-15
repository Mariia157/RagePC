import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CATEGORIES, formatPrice, type Category } from "@/lib/categories";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";

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
      <nav className="text-sm text-[var(--color-muted)] mb-4">
        <Link href="/" className="hover:text-white">Головна</Link>
        <span className="mx-2">/</span>
        <Link href={`/catalog/${category}`} className="hover:text-white">
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
          />
        </div>

        <div>
          <div className="text-sm text-[var(--color-muted)] uppercase tracking-wide">
            {product.brand}
          </div>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
          <p className="mt-4 text-[var(--color-muted)]">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="text-4xl font-black text-[var(--color-brand)]">
              {formatPrice(product.price)}
            </div>
            <div className="text-sm text-[var(--color-muted)]">
              {product.stock > 0 ? `В наявності: ${product.stock} шт.` : "Немає в наявності"}
            </div>
          </div>

          <div className="mt-6">
            <AddToCartButton productId={product.id} disabled={product.stock <= 0} />
          </div>

          {specs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Характеристики</h2>
              <dl className="card divide-y divide-[var(--color-border)]">
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between px-4 py-2 text-sm">
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
