import { prisma } from "@/lib/prisma";
import BuildCardWithPopup from "@/components/BuildCardWithPopup";

export default async function BuildsPage() {
  const builds = await prisma.prebuiltBuild.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      components: { include: { product: true } },
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black">Готові збірки</h1>
        <p className="text-[var(--color-muted)] mt-1 max-w-2xl">
          Протестовані конфігурації від інженерів RagePC. Сумісність
          перевірена, продуктивність заміряна. Залишається лише натиснути кнопку.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {builds.map((b) => (
          <BuildCardWithPopup key={b.id} build={b} />
        ))}
      </div>
    </div>
  );
}
