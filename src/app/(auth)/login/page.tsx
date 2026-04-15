import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Вхід</h1>
      <p className="text-[var(--color-muted)] mt-1">
        Ще немає акаунта?{" "}
        <Link href="/register" className="text-[var(--color-brand)] hover:underline">
          Зареєструйтесь
        </Link>
      </p>
      <div className="card p-6 mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
