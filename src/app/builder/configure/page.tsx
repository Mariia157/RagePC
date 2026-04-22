import { prisma } from "@/lib/prisma";
import BuilderClient from "@/components/BuilderClient";

export default async function BuilderConfigurePage() {
  const products = await prisma.product.findMany({
    where: { category: { in: ["cpu", "motherboard", "ram", "gpu", "psu", "case", "air_cooler", "water_cooler"] } },
    orderBy: { price: "asc" },
    select: {
      id: true,
      slug: true,
      category: true,
      name: true,
      brand: true,
      price: true,
      socket: true,
      tdp: true,
      gpuLengthMm: true,
      gpuPowerDraw: true,
      ramType: true,
      formFactor: true,
      supportedFormFactors: true,
      maxGpuLengthMm: true,
      wattage: true,
      supportedSockets: true,
      maxTdp: true,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-black">Розумний конфігуратор</h1>
        <p className="text-[var(--color-muted)] mt-1">
          Обирайте комплектуючі — ми автоматично відфільтруємо несумісні варіанти та перевіримо потужність блока живлення.
        </p>
      </div>
      <BuilderClient products={products} />
    </div>
  );
}
