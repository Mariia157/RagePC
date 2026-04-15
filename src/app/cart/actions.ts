"use server";

import { prisma } from "@/lib/prisma";
import { getCartScopeForWrite } from "@/lib/cart";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, qty: number = 1) {
  const scope = await getCartScopeForWrite();
  const existing = await prisma.cartItem.findFirst({
    where: { ...scope, productId },
  });
  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + qty },
    });
  } else {
    await prisma.cartItem.create({
      data: { ...scope, productId, quantity: qty },
    });
  }
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function updateCartItem(itemId: string, quantity: number) {
  const scope = await getCartScopeForWrite();
  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({ where: { id: itemId, ...scope } });
  } else {
    await prisma.cartItem.updateMany({
      where: { id: itemId, ...scope },
      data: { quantity },
    });
  }
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeCartItem(itemId: string) {
  const scope = await getCartScopeForWrite();
  await prisma.cartItem.deleteMany({ where: { id: itemId, ...scope } });
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function addBuildToCart(productIds: string[]) {
  const scope = await getCartScopeForWrite();
  for (const productId of productIds) {
    const existing = await prisma.cartItem.findFirst({
      where: { ...scope, productId },
    });
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: { ...scope, productId, quantity: 1 },
      });
    }
  }
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}
