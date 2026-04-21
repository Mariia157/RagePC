"use client";

import { useLang } from "@/components/LangProvider";
import { LANG_LABELS, type Lang } from "@/lib/i18n";

const langs: Lang[] = ["uk", "ru", "en"];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-0.5 text-xs">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-[var(--color-border)] mx-0.5">/</span>}
          <button
            onClick={() => setLang(l)}
            className={`px-1 py-0.5 rounded transition ${
              lang === l
                ? "text-[var(--color-brand)] font-bold"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {LANG_LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
