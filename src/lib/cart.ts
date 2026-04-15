import { prisma } from "@/lib/prisma";
import { getCartSessionId, getCurrentUserId, getOrCreateCartSessionId } from "@/lib/session";

export async function getCartScope() {
  const userId = await getCurrentUserId();
  if (userId) return { userId };
  const sessionId = await getCartSessionId();
  return sessionId ? { sessionId } : null;
}

export async function getCartScopeForWrite() {
  const userId = await getCurrentUserId();
  if (userId) return { userId };
  const sessionId = await getOrCreateCartSessionId();
  return { sessionId };
}

export async function getCart() {
  const scope = await getCartScope();
  if (!scope) return [];
  return prisma.cartItem.findMany({
    where: scope,
    include: { product: true },
    orderBy: { addedAt: "asc" },
  });
}

export async function getCartCount() {
  const scope = await getCartScope();
  if (!scope) return 0;
  const agg = await prisma.cartItem.aggregate({
    where: scope,
    _sum: { quantity: true },
  });
  return agg._sum.quantity ?? 0;
}
