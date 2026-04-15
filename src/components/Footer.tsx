export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-[var(--color-muted)] flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="text-lg font-black">
            <span className="text-white">Rage</span>
            <span className="text-[var(--color-brand)]">PC</span>
          </div>
          <p className="mt-1">Збірка ігрових ПК та периферія</p>
        </div>
        <div>© {new Date().getFullYear()} RagePC. Усі права захищено.</div>
      </div>
    </footer>
  );
}
