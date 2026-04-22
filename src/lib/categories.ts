export const CATEGORIES = {
  cpu: "Процесори",
  motherboard: "Материнські плати",
  gpu: "Відеокарти",
  ram: "Оперативна пам'ять",
  ssd: "Накопичувачі SSD",
  hdd: "Накопичувачі HDD",
  psu: "Блоки живлення",
  case: "Корпуси",
  air_cooler: "Повітряне охолодження",
  water_cooler: "Водяне охолодження",
  sound_card: "Звукові карти",
  network_card: "Мережеві карти",
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

export function calcDiscountedPrice(price: number, discount: number | null | undefined): number {
  if (!discount) return price;
  return Math.round(price * (1 - discount / 100));
}
