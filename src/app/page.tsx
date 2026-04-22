import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const builds = await prisma.prebuiltBuild.findMany({
    orderBy: { createdAt: "asc" },
    take: 4,
    include: { components: { include: { product: true } } },
  });

  return <HomeClient builds={builds} />;
}
