import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Реєстрація</h1>
      <p className="text-[var(--color-muted)] mt-1">
        Вже маєте акаунт?{" "}
        <Link href="/login" className="text-[var(--color-brand)] hover:underline">
          Увійти
        </Link>
      </p>
      <div className="card p-6 mt-6">
        <RegisterForm />
      </div>
    </div>
  );
}
