"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { type Lang, type DictKey, t as translate } from "@/lib/i18n";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "uk",
  setLang: () => {},
  t: (key) => key,
});

export function useLang() {
  return useContext(LangContext);
}

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uk");

  useEffect(() => {
    const stored = localStorage.getItem("ragepc_lang") as Lang | null;
    if (stored && ["uk", "ru", "en"].includes(stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("ragepc_lang", l);
  }, []);

  const t = useCallback((key: DictKey) => translate(key, lang), [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}
