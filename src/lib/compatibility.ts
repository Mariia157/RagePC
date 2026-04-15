export type BuildProduct = {
  id: string;
  slug: string;
  category: string;
  name: string;
  brand: string;
  price: number;
  socket: string | null;
  tdp: number | null;
  gpuLengthMm: number | null;
  gpuPowerDraw: number | null;
  ramType: string | null;
  formFactor: string | null;
  supportedFormFactors: string | null;
  maxGpuLengthMm: number | null;
  wattage: number | null;
  supportedSockets: string | null;
  maxTdp: number | null;
};

export type BuildSelection = {
  cpu: BuildProduct | null;
  motherboard: BuildProduct | null;
  ram: BuildProduct | null;
  gpu: BuildProduct | null;
  psu: BuildProduct | null;
  case: BuildProduct | null;
  cooler: BuildProduct | null;
};

export const EMPTY_BUILD: BuildSelection = {
  cpu: null,
  motherboard: null,
  ram: null,
  gpu: null,
  psu: null,
  case: null,
  cooler: null,
};

export const BUILD_STEPS = [
  { key: "cpu", label: "Процесор" },
  { key: "motherboard", label: "Мат. плата" },
  { key: "ram", label: "Пам'ять" },
  { key: "gpu", label: "Відеокарта" },
  { key: "cooler", label: "Охолодження" },
  { key: "case", label: "Корпус" },
  { key: "psu", label: "Блок живлення" },
] as const;

export type BuildStepKey = (typeof BUILD_STEPS)[number]["key"];

export function isCompatible(
  product: BuildProduct,
  build: BuildSelection,
): { ok: boolean; reason?: string } {
  switch (product.category) {
    case "cpu":
      if (build.motherboard?.socket && product.socket !== build.motherboard.socket)
        return { ok: false, reason: `Сокет ${product.socket} не збігається з ${build.motherboard.socket}` };
      if (build.cooler?.supportedSockets && product.socket && !build.cooler.supportedSockets.split(",").includes(product.socket))
        return { ok: false, reason: "Кулер не підтримує цей сокет" };
      if (build.cooler?.maxTdp && product.tdp && product.tdp > build.cooler.maxTdp)
        return { ok: false, reason: `TDP процесора перевищує можливості кулера (${build.cooler.maxTdp} Вт)` };
      return { ok: true };

    case "motherboard":
      if (build.cpu?.socket && product.socket !== build.cpu.socket)
        return { ok: false, reason: `Сокет ${product.socket} не збігається з процесором (${build.cpu.socket})` };
      if (build.ram?.ramType && product.ramType !== build.ram.ramType)
        return { ok: false, reason: `Тип пам'яті ${product.ramType} не збігається з обраною ОЗП (${build.ram.ramType})` };
      if (build.case?.supportedFormFactors && product.formFactor && !build.case.supportedFormFactors.split(",").includes(product.formFactor))
        return { ok: false, reason: `Форм-фактор ${product.formFactor} не вміщається в корпус` };
      return { ok: true };

    case "ram":
      if (build.motherboard?.ramType && product.ramType !== build.motherboard.ramType)
        return { ok: false, reason: `Тип пам'яті ${product.ramType} не підтримується мат. платою (${build.motherboard.ramType})` };
      return { ok: true };

    case "gpu":
      if (build.case?.maxGpuLengthMm && product.gpuLengthMm && product.gpuLengthMm > build.case.maxGpuLengthMm)
        return { ok: false, reason: `Довжина ${product.gpuLengthMm} мм перевищує межу корпуса (${build.case.maxGpuLengthMm} мм)` };
      return { ok: true };

    case "cooler":
      if (build.cpu?.socket && product.supportedSockets && !product.supportedSockets.split(",").includes(build.cpu.socket))
        return { ok: false, reason: `Не підтримує сокет ${build.cpu.socket}` };
      if (build.cpu?.tdp && product.maxTdp && build.cpu.tdp > product.maxTdp)
        return { ok: false, reason: `TDP ${build.cpu.tdp} Вт вище за ліміт кулера (${product.maxTdp} Вт)` };
      return { ok: true };

    case "case":
      if (build.motherboard?.formFactor && product.supportedFormFactors && !product.supportedFormFactors.split(",").includes(build.motherboard.formFactor))
        return { ok: false, reason: `Не підтримує форм-фактор ${build.motherboard.formFactor}` };
      if (build.gpu?.gpuLengthMm && product.maxGpuLengthMm && build.gpu.gpuLengthMm > product.maxGpuLengthMm)
        return { ok: false, reason: `Макс. довжина GPU ${product.maxGpuLengthMm} мм менша за обрану (${build.gpu.gpuLengthMm} мм)` };
      return { ok: true };

    case "psu": {
      const required = estimateWattage(build) + 100;
      if (product.wattage && product.wattage < required)
        return { ok: false, reason: `Потрібно ≥ ${required} Вт, в обраного БЖ — ${product.wattage} Вт` };
      return { ok: true };
    }

    default:
      return { ok: true };
  }
}

export function estimateWattage(build: BuildSelection): number {
  let total = 50;
  if (build.cpu?.tdp) total += build.cpu.tdp;
  if (build.gpu?.gpuPowerDraw) total += build.gpu.gpuPowerDraw;
  if (build.ram) total += 10;
  if (build.motherboard) total += 50;
  return total;
}

export function totalPrice(build: BuildSelection): number {
  return Object.values(build).reduce((s, p) => s + (p?.price ?? 0), 0);
}

export function validateBuild(build: BuildSelection): string[] {
  const warnings: string[] = [];
  if (build.cpu && build.motherboard && build.cpu.socket !== build.motherboard.socket)
    warnings.push("Сокет процесора не збігається з мат. платою");
  if (build.motherboard && build.ram && build.motherboard.ramType !== build.ram.ramType)
    warnings.push("Тип пам'яті не збігається з мат. платою");
  if (build.case && build.motherboard?.formFactor && build.case.supportedFormFactors) {
    if (!build.case.supportedFormFactors.split(",").includes(build.motherboard.formFactor))
      warnings.push("Корпус не підтримує форм-фактор мат. плати");
  }
  if (build.case?.maxGpuLengthMm && build.gpu?.gpuLengthMm && build.gpu.gpuLengthMm > build.case.maxGpuLengthMm)
    warnings.push("Відеокарта не вміщається в корпус");
  if (build.cooler && build.cpu?.socket && build.cooler.supportedSockets) {
    if (!build.cooler.supportedSockets.split(",").includes(build.cpu.socket))
      warnings.push("Кулер не підтримує сокет процесора");
  }
  if (build.cooler?.maxTdp && build.cpu?.tdp && build.cpu.tdp > build.cooler.maxTdp)
    warnings.push(`Кулер не впорається з TDP процесора (${build.cpu.tdp} > ${build.cooler.maxTdp} Вт)`);
  if (build.psu?.wattage) {
    const req = estimateWattage(build) + 100;
    if (build.psu.wattage < req)
      warnings.push(`БЖ слабкий: потрібно ≥ ${req} Вт, встановлено ${build.psu.wattage} Вт`);
  }
  return warnings;
}
