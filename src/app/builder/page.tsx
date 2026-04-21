import Link from "next/link";
import {
  Wrench,
  MessageCircle,
  Cpu,
  MonitorSpeaker,
  HardDrive,
  MemoryStick,
  BatteryCharging,
  Box,
  Fan,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  Send,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Оберіть процесор",
    desc: "Визначте платформу — Intel або AMD. Від цього залежить материнська плата та охолодження.",
    icon: Cpu,
  },
  {
    num: "02",
    title: "Додайте відеокарту",
    desc: "Ми автоматично перевіримо довжину GPU відносно корпусу та потужність блока живлення.",
    icon: MonitorSpeaker,
  },
  {
    num: "03",
    title: "Оберіть пам'ять та плату",
    desc: "Конфігуратор відфільтрує несумісні варіанти DDR4/DDR5 та форм-фактори.",
    icon: MemoryStick,
  },
  {
    num: "04",
    title: "Завершіть збірку",
    desc: "Додайте БЖ, корпус та охолодження. Система перевірить все автоматично.",
    icon: CheckCircle,
  },
];

const advantages = [
  { icon: Shield, title: "Перевірка сумісності", desc: "Сокети, пам'ять, форм-фактор, довжина GPU — все перевіряється в реальному часі" },
  { icon: Zap, title: "Розрахунок потужності", desc: "Автоматичний підбір блока живлення під вашу конфігурацію" },
  { icon: CheckCircle, title: "Без помилок", desc: "Несумісні компоненти автоматично приховуються зі списку" },
];

export default function BuilderStartPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(700px circle at 30% 40%, rgba(220,38,38,0.4), transparent 60%), radial-gradient(500px circle at 80% 60%, rgba(220,38,38,0.15), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand)] text-xs font-semibold mb-6">
              <Cpu size={14} /> Конфігуратор ПК
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Збери свій ідеальний
              <span className="text-[var(--color-brand)]"> комп'ютер</span>
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)] leading-relaxed">
              Скористайтесь нашим розумним конфігуратором з автоматичною
              перевіркою сумісності або отримайте допомогу від наших спеціалістів.
            </p>
          </div>
        </div>
      </section>

      {/* Two options */}
      <section className="mx-auto max-w-5xl px-4 -mt-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Self-assembly */}
          <div className="relative group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 flex flex-col hover:border-[var(--color-brand)] transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand)]/10 flex items-center justify-center mb-6">
              <Wrench size={32} className="text-[var(--color-brand)]" />
            </div>
            <h2 className="text-2xl font-bold">Зібрати самостійно</h2>
            <p className="mt-3 text-[var(--color-muted)] leading-relaxed flex-1">
              Відкрийте конфігуратор та обирайте комплектуючі самостійно.
              Система автоматично перевірить сумісність сокетів, пам'яті,
              форм-факторів та потужність блока живлення.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-[var(--color-muted)]">
                <CheckCircle size={16} className="text-[var(--color-brand)] shrink-0" />
                Автоматична перевірка сумісності
              </li>
              <li className="flex items-center gap-2 text-[var(--color-muted)]">
                <CheckCircle size={16} className="text-[var(--color-brand)] shrink-0" />
                Фільтрація несумісних компонентів
              </li>
              <li className="flex items-center gap-2 text-[var(--color-muted)]">
                <CheckCircle size={16} className="text-[var(--color-brand)] shrink-0" />
                Розрахунок потужності БЖ
              </li>
            </ul>
            <Link
              href="/builder/configure"
              className="btn-primary mt-6 rounded-full text-base py-3"
            >
              Почати збірку <ArrowRight size={18} />
            </Link>
          </div>

          {/* Help */}
          <div className="relative group rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 flex flex-col hover:border-[var(--color-brand)] transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand)]/10 flex items-center justify-center mb-6">
              <MessageCircle size={32} className="text-[var(--color-brand)]" />
            </div>
            <h2 className="text-2xl font-bold">Допомога у збірці</h2>
            <p className="mt-3 text-[var(--color-muted)] leading-relaxed flex-1">
              Не впевнені у виборі комплектуючих? Наші спеціалісти допоможуть
              підібрати оптимальну конфігурацію під ваш бюджет та задачі —
              геймінг, стримінг, робота чи навчання.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-[var(--color-muted)]">
                <CheckCircle size={16} className="text-[var(--color-brand)] shrink-0" />
                Підбір під бюджет та задачі
              </li>
              <li className="flex items-center gap-2 text-[var(--color-muted)]">
                <CheckCircle size={16} className="text-[var(--color-brand)] shrink-0" />
                Консультація від спеціалістів
              </li>
              <li className="flex items-center gap-2 text-[var(--color-muted)]">
                <CheckCircle size={16} className="text-[var(--color-brand)] shrink-0" />
                Відповідь протягом 2 годин
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 rounded-full text-base py-3"
              >
                <Send size={18} /> Telegram
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex-1 rounded-full text-base py-3 text-center"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 border-t border-[var(--color-border)]">
        <h2 className="text-2xl font-bold mb-8 text-center">Як працює конфігуратор</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 h-full hover:border-[var(--color-brand)] transition">
                <div className="text-3xl font-black text-[var(--color-brand)]/20 mb-3">
                  {step.num}
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center mb-3">
                  <step.icon size={20} className="text-[var(--color-brand)]" />
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight size={20} className="text-[var(--color-brand)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-8">Переваги конфігуратора RagePC</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
                  <a.icon size={20} className="text-[var(--color-brand)]" />
                </div>
                <div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)] leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Готові зібрати свій ПК?</h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Починайте прямо зараз — це безкоштовно і займе лише кілька хвилин.
          </p>
          <Link
            href="/builder/configure"
            className="btn-primary mt-6 inline-flex text-base px-8 py-3 rounded-full"
          >
            <Cpu size={18} /> Почати збірку
          </Link>
        </div>
      </section>
    </div>
  );
}
