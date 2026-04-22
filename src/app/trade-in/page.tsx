import React from "react";
import {
  ArrowRight,
  ClipboardList,
  Truck,
  SearchCheck,
  Gift,
  Cpu,
  MonitorSpeaker,
  MemoryStick,
  HardDrive,
  Monitor,
  Gamepad2,
  Laptop,
  Check,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: ClipboardList,
    title: "Залишіть заявку",
    text: "Заповніть форму онлайн або зверніться до нашого менеджера. Попередня оцінка протягом 2 робочих годин.",
  },
  {
    icon: Truck,
    title: "Доставте пристрій",
    text: "Привезіть техніку до нашого офісу або надішліть Новою Поштою за нашим сприянням.",
  },
  {
    icon: SearchCheck,
    title: "Тестування",
    text: "Спеціалісти проведуть візуальний огляд та перевірку працездатності протягом 1 робочого дня.",
  },
  {
    icon: Gift,
    title: "Отримайте бонуси",
    text: "Після успішної перевірки ви отримуєте бонуси на рахунок, якими можна оплатити будь-який товар.",
  },
];

const eligibleCategories = [
  { icon: Cpu, label: "Процесори", desc: "Intel Core 10-го покоління+, AMD Ryzen 3000+" },
  { icon: MonitorSpeaker, label: "Відеокарти", desc: "NVIDIA GTX 1650+, AMD RX 5600+" },
  { icon: HardDrive, label: "Материнські плати", desc: "Платформи LGA1200+ та AM4/AM5" },
  { icon: MemoryStick, label: "Оперативна пам'ять", desc: "DDR4 16 ГБ+, DDR5" },
  { icon: Monitor, label: "Монітори", desc: "IPS/VA 24\"+, 144 Гц+, в оригінальній упаковці" },
  { icon: Laptop, label: "Ноутбуки", desc: "Від 2020 року випуску, у робочому стані" },
  { icon: Gamepad2, label: "Ігрові консолі", desc: "PS4 Pro, PS5, Xbox Series S/X" },
];

const rules = [
  "Техніка повинна бути у повністю робочому стані",
  "Фізична цілісність — без тріщин, сколів та пошкоджень",
  "Оцінка дійсна протягом 3 робочих днів",
  "Бонуси діють 12 місяців з моменту нарахування",
];

export default function TradeInPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(700px circle at 70% 30%, rgba(220,38,38,0.4), transparent 60%), radial-gradient(500px circle at 30% 70%, rgba(34,197,94,0.15), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand)] text-xs font-semibold mb-6">
              <Gift size={14} /> Trade-In програма
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Обміняй стару техніку на
              <span className="text-[var(--color-brand)]"> нову</span>
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)] leading-relaxed">
              Здайте своє старе обладнання та отримайте бонуси на покупку
              будь-яких товарів у RagePC. Без обмежень по категоріях —
              процесор можна обміняти на відеокарту!
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#form" className="btn-primary text-base px-6 py-3 rounded-full">
                Залишити заявку
              </a>
              <a href="#how" className="btn-ghost text-base px-6 py-3 rounded-full">
                Як це працює?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Як це працює</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 md:items-center gap-y-6 gap-x-10">
          {steps.map((step, i) => (
            <React.Fragment key={step.title}>
              <div className="relative rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 h-full hover:border-[var(--color-brand)] transition">
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-[25px]">
                    <ArrowRight size={20} className="text-[var(--color-brand)]" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand)]/10 flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-[var(--color-brand)]" />
                </div>
                <div className="text-xs text-[var(--color-muted)] font-semibold uppercase tracking-wider mb-2">
                  Крок {i + 1}
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {step.text}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Eligible categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold mb-2">Що можна здати</h2>
        <p className="text-[var(--color-muted)] mb-8">
          Ми приймаємо широкий спектр комп'ютерної техніки та комплектуючих
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eligibleCategories.map((cat) => (
            <div
              key={cat.label}
              className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 flex items-start gap-4 hover:border-[var(--color-brand)] transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
                <cat.icon size={20} className="text-[var(--color-brand)]" />
              </div>
              <div>
                <div className="font-semibold">{cat.label}</div>
                <div className="text-sm text-[var(--color-muted)] mt-1">{cat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Правила програми</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule) => (
              <div key={rule} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--color-brand)]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-[var(--color-brand)]" />
                </div>
                <span className="text-[var(--color-muted)]">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form CTA */}
      <section id="form" className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--color-brand-dim)] to-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-12">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(400px circle at 90% 50%, rgba(220,38,38,0.5), transparent 60%)",
            }}
          />
          <div className="relative max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold">
              Готові обміняти техніку?
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              Напишіть нам у Telegram або Instagram — наш менеджер оцінить вашу
              техніку протягом 2 годин і запропонує найкращі умови.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-6 py-3 rounded-full"
              >
                Написати в Telegram
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base px-6 py-3 rounded-full"
              >
                Написати в Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
