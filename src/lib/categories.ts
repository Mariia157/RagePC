export const CATEGORIES = {
  cpu: "Процесори",
  gpu: "Відеокарти",
  motherboard: "Материнські плати",
  ram: "Оперативна пам'ять",
  psu: "Блоки живлення",
  case: "Корпуси",
  cooler: "Охолодження",
  headset: "Периферія",
} as const;

export type Category = keyof typeof CATEGORIES;

export function isCategory(v: string): v is Category {
  return v in CATEGORIES;
}

export const PERIPHERAL_SUBTYPES = {
  headphones: "Навушники",
  mouse: "Миша",
  keyboard: "Клавіатура",
} as const;

export type PeripheralSubtype = keyof typeof PERIPHERAL_SUBTYPES;

export function isPeripheralSubtype(v: string): v is PeripheralSubtype {
  return v in PERIPHERAL_SUBTYPES;
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("uk-UA")} ₴`;
}
