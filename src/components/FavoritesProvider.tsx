"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type FavoritesContextType = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
};

const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  toggle: () => {},
  has: () => false,
  count: 0,
});

export function useFavorites() {
  return useContext(FavoritesContext);
}

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ragepc_favorites");
      if (stored) setIds(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("ragepc_favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return (
    <FavoritesContext.Provider value={{ ids, toggle, has, count: ids.length }}>
      {children}
    </FavoritesContext.Provider>
  );
}
