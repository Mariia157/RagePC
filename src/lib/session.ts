import { cookies } from "next/headers";
import { randomBytes } from "crypto";

const CART_COOKIE = "rage_cart_sid";
const USER_COOKIE = "rage_user";

export async function getOrCreateCartSessionId(): Promise<string> {
  const store = await cookies();
  let sid = store.get(CART_COOKIE)?.value;
  if (!sid) {
    sid = randomBytes(16).toString("hex");
    store.set(CART_COOKIE, sid, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }
  return sid;
}

export async function getCartSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

export async function getCurrentUserId(): Promise<string | null> {
  const store = await cookies();
  return store.get(USER_COOKIE)?.value ?? null;
}

export async function setCurrentUserId(userId: string) {
  const store = await cookies();
  store.set(USER_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function clearCurrentUser() {
  const store = await cookies();
  store.delete(USER_COOKIE);
}
