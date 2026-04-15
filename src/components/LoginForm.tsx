"use client";

import { useActionState } from "react";
import { login } from "@/app/(auth)/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});

  return (
    <form action={action} className="space-y-4">
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Пароль" name="password" type="password" required autoComplete="current-password" />
      {state?.error && (
        <div className="text-sm text-[var(--color-brand)]">{state.error}</div>
      )}
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Вхід..." : "Увійти"}
      </button>
    </form>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm text-[var(--color-muted)]">{label}</span>
      <input
        {...props}
        className="mt-1 w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:border-[var(--color-brand)]"
      />
    </label>
  );
}
