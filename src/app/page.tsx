import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const [builds, popularProducts] = await Promise.all([
    prisma.prebuiltBuild.findMany({
      orderBy: { createdAt: "asc" },
      take: 4,
      include: { components: { include: { product: true } } },
    }),
    prisma.product.findMany({
      where: { category: { in: ["gpu", "cpu"] } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return <HomeClient builds={builds} popularProducts={popularProducts} />;
}
