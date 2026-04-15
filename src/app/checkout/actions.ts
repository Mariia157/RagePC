"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";
import { revalidatePath } from "next/cache";

export type CheckoutState = { error?: string };

export async function placeOrder(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const userId = await getCurrentUserId();
  if (!userId) return { error: "Необхідно увійти в акаунт" };

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const street = String(formData.get("street") ?? "").trim();
  const postal = String(formData.get("postal") ?? "").trim();

  if (!fullName || !phone || !city || !street || !postal) {
    return { error: "Заповніть усі поля адреси" };
  }

  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
  if (items.length === 0) return { error: "Кошик порожній" };

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      status: "paid",
      fullName,
      phone,
      city,
      street,
      postal,
      items: {
        create: items.map((i) => ({
          productId: i.productId,
          name: i.product.name,
          category: i.product.category,
          price: i.product.price,
          quantity: i.quantity,
        })),
      },
    },
  });

  await prisma.cartItem.deleteMany({ where: { userId } });
  revalidatePath("/", "layout");
  redirect(`/account/orders/${order.id}`);
}
