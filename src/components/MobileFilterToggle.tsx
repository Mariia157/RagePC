"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

export default function MobileFilterToggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium mb-4"
      >
        <SlidersHorizontal size={16} />
        Фільтри
      </button>

      {/* Desktop — always visible */}
      <div className="hidden md:block">
        {children}
      </div>

      {/* Mobile — drawer */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50 md:hidden" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-[300px] max-w-[85vw] bg-[var(--color-background)] z-50 md:hidden flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              <span className="font-semibold">Фільтри</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-[var(--color-surface)] transition">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {children}
            </div>
            <div className="p-4 border-t border-[var(--color-border)]">
              <button
                onClick={() => setOpen(false)}
                className="btn-primary w-full rounded-full py-2.5 text-sm"
              >
                Показати результати
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
