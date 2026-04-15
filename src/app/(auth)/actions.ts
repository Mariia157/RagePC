"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {
  clearCurrentUser,
  getCartSessionId,
  setCurrentUserId,
} from "@/lib/session";
import { revalidatePath } from "next/cache";

export type AuthState = { error?: string };

async function mergeGuestCartIntoUser(userId: string) {
  const sessionId = await getCartSessionId();
  if (!sessionId) return;
  const guestItems = await prisma.cartItem.findMany({
    where: { sessionId },
  });
  for (const item of guestItems) {
    const existing = await prisma.cartItem.findFirst({
      where: { userId, productId: item.productId },
    });
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + item.quantity },
      });
      await prisma.cartItem.delete({ where: { id: item.id } });
    } else {
      await prisma.cartItem.update({
        where: { id: item.id },
        data: { userId, sessionId: null },
      });
    }
  }
}

export async function register(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim() || null;

  if (!email || !password) return { error: "Вкажіть email та пароль" };
  if (password.length < 6) return { error: "Пароль має бути не менше 6 символів" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Користувач з таким email вже існує" };

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  await setCurrentUserId(user.id);
  await mergeGuestCartIntoUser(user.id);
  revalidatePath("/", "layout");
  redirect("/account");
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "Невірний email або пароль" };

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return { error: "Невірний email або пароль" };

  await setCurrentUserId(user.id);
  await mergeGuestCartIntoUser(user.id);
  revalidatePath("/", "layout");
  redirect("/account");
}

export async function logout() {
  await clearCurrentUser();
  revalidatePath("/", "layout");
  redirect("/");
}
