"use client";

import { useActionState } from "react";
import { CreditCard } from "lucide-react";
import { placeOrder } from "@/app/checkout/actions";

export default function CheckoutForm() {
  const [state, action, pending] = useActionState(placeOrder, {});

  return (
    <form action={action} className="space-y-4">
      <h2 className="font-semibold text-lg">Адреса доставки</h2>
      <Field label="ПІБ одержувача" name="fullName" required />
      <Field label="Телефон" name="phone" type="tel" required placeholder="+380 __ ___ __ __" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Field label="Місто" name="city" required />
        </div>
        <Field label="Індекс" name="postal" required />
      </div>
      <Field label="Вулиця, будинок, квартира" name="street" required />

      <div className="border-t border-[var(--color-border)] pt-4">
        <h2 className="font-semibold text-lg">Оплата</h2>
        <div className="mt-3 card p-4 border-dashed bg-[var(--color-surface-2)]/50">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard size={16} className="text-[var(--color-brand)]" />
            <span className="font-medium">Тестовий режим</span>
          </div>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Реальна платіжна система не підключена. Замовлення буде створено зі статусом «оплачено».
          </p>
        </div>
      </div>

      {state?.error && (
        <div className="text-sm text-[var(--color-brand)]">{state.error}</div>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Оформлюємо..." : "Підтвердити замовлення"}
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
