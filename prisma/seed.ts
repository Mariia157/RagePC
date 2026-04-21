import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const products = [
  // CPU
  {
    slug: "intel-i5-13400f",
    category: "cpu",
    name: "Intel Core i5-13400F",
    brand: "Intel",
    price: 8990,
    discount: 15,
    image: "/products/cpu-intel.svg",
    description: "10 ядер (6P+4E), 16 потоків, до 4.6 ГГц. Відмінний баланс ціни та продуктивності.",
    socket: "LGA1700",
    tdp: 148,
    cores: 10,
    threads: 16,
    baseClockGhz: 2.5,
  },
  {
    slug: "intel-i7-13700k",
    category: "cpu",
    name: "Intel Core i7-13700K",
    brand: "Intel",
    price: 18990,
    image: "/products/cpu-intel.svg",
    description: "16 ядер (8P+8E), 24 потоки, до 5.4 ГГц. Для безкомпромісного геймінгу.",
    socket: "LGA1700",
    tdp: 253,
    cores: 16,
    threads: 24,
    baseClockGhz: 3.4,
  },
  {
    slug: "amd-ryzen-5-7600x",
    category: "cpu",
    name: "AMD Ryzen 5 7600X",
    brand: "AMD",
    price: 10990,
    image: "/products/cpu-amd.svg",
    description: "6 ядер, 12 потоків, до 5.3 ГГц. Архітектура Zen 4.",
    socket: "AM5",
    tdp: 105,
    cores: 6,
    threads: 12,
    baseClockGhz: 4.7,
  },
  {
    slug: "amd-ryzen-7-7800x3d",
    category: "cpu",
    name: "AMD Ryzen 7 7800X3D",
    brand: "AMD",
    price: 20990,
    image: "/products/cpu-amd.svg",
    description: "8 ядер, 16 потоків, 3D V-Cache. Король ігрової продуктивності.",
    socket: "AM5",
    tdp: 120,
    cores: 8,
    threads: 16,
    baseClockGhz: 4.2,
  },

  // GPU
  {
    slug: "rtx-4060",
    category: "gpu",
    name: "NVIDIA RTX 4060 8GB",
    brand: "NVIDIA",
    price: 14990,
    discount: 10,
    image: "/products/gpu-nvidia.svg",
    description: "8 ГБ GDDR6, DLSS 3, Ray Tracing. Для 1080p ультра.",
    gpuLengthMm: 245,
    gpuPowerDraw: 115,
    vramGb: 8,
  },
  {
    slug: "rtx-4070-super",
    category: "gpu",
    name: "NVIDIA RTX 4070 Super 12GB",
    brand: "NVIDIA",
    price: 29990,
    image: "/products/gpu-nvidia.svg",
    description: "12 ГБ GDDR6X, потужність для 1440p з трасуванням променів.",
    gpuLengthMm: 304,
    gpuPowerDraw: 220,
    vramGb: 12,
  },
  {
    slug: "rtx-4080-super",
    category: "gpu",
    name: "NVIDIA RTX 4080 Super 16GB",
    brand: "NVIDIA",
    price: 54990,
    image: "/products/gpu-nvidia.svg",
    description: "16 ГБ GDDR6X. 4K-геймінг без компромісів.",
    gpuLengthMm: 336,
    gpuPowerDraw: 320,
    vramGb: 16,
  },
  {
    slug: "rx-7800-xt",
    category: "gpu",
    name: "AMD Radeon RX 7800 XT 16GB",
    brand: "AMD",
    price: 26990,
    image: "/products/gpu-amd.svg",
    description: "16 ГБ GDDR6, відмінний вибір для 1440p.",
    gpuLengthMm: 267,
    gpuPowerDraw: 263,
    vramGb: 16,
  },

  // Motherboard
  {
    slug: "asus-b760-plus",
    category: "motherboard",
    name: "ASUS TUF Gaming B760-PLUS",
    brand: "ASUS",
    price: 8490,
    image: "/products/mb.svg",
    description: "LGA1700, DDR5, ATX. Надійна плата для Intel 13-го покоління.",
    socket: "LGA1700",
    ramType: "DDR5",
    formFactor: "ATX",
  },
  {
    slug: "msi-z790-tomahawk",
    category: "motherboard",
    name: "MSI MAG Z790 Tomahawk",
    brand: "MSI",
    price: 13990,
    image: "/products/mb.svg",
    description: "LGA1700, DDR5, ATX, розгін для K-процесорів.",
    socket: "LGA1700",
    ramType: "DDR5",
    formFactor: "ATX",
  },
  {
    slug: "gigabyte-b650-aorus",
    category: "motherboard",
    name: "Gigabyte B650 Aorus Elite AX",
    brand: "Gigabyte",
    price: 9990,
    image: "/products/mb.svg",
    description: "AM5, DDR5, ATX, Wi-Fi 6E.",
    socket: "AM5",
    ramType: "DDR5",
    formFactor: "ATX",
  },
  {
    slug: "asrock-b650m-itx",
    category: "motherboard",
    name: "ASRock B650M-ITX",
    brand: "ASRock",
    price: 8990,
    image: "/products/mb.svg",
    description: "AM5, DDR5, mini-ITX для компактних збірок.",
    socket: "AM5",
    ramType: "DDR5",
    formFactor: "ITX",
  },

  // RAM
  {
    slug: "kingston-fury-ddr5-32",
    category: "ram",
    name: "Kingston Fury Beast 32GB DDR5-6000",
    brand: "Kingston",
    price: 4990,
    discount: 20,
    image: "/products/ram.svg",
    description: "2x16 ГБ, CL36, з підсвіткою.",
    ramType: "DDR5",
    ramSpeedMhz: 6000,
    ramCapacityGb: 32,
  },
  {
    slug: "corsair-vengeance-ddr5-32",
    category: "ram",
    name: "Corsair Vengeance 32GB DDR5-6400",
    brand: "Corsair",
    price: 5990,
    image: "/products/ram.svg",
    description: "2x16 ГБ, CL32. Висока частота для Ryzen та Core.",
    ramType: "DDR5",
    ramSpeedMhz: 6400,
    ramCapacityGb: 32,
  },
  {
    slug: "gskill-ripjaws-ddr4-16",
    category: "ram",
    name: "G.Skill Ripjaws V 16GB DDR4-3600",
    brand: "G.Skill",
    price: 2290,
    image: "/products/ram.svg",
    description: "2x8 ГБ DDR4 для бюджетних збірок.",
    ramType: "DDR4",
    ramSpeedMhz: 3600,
    ramCapacityGb: 16,
  },

  // PSU
  {
    slug: "corsair-rm650e",
    category: "psu",
    name: "Corsair RM650e",
    brand: "Corsair",
    price: 3990,
    image: "/products/psu.svg",
    description: "650 Вт, 80+ Gold, повністю модульний.",
    wattage: 650,
    formFactor: "ATX",
  },
  {
    slug: "bequiet-straight-power-850",
    category: "psu",
    name: "be quiet! Straight Power 12 850W",
    brand: "be quiet!",
    price: 6990,
    image: "/products/psu.svg",
    description: "850 Вт, 80+ Platinum, ATX 3.0, тиша та надійність.",
    wattage: 850,
    formFactor: "ATX",
  },
  {
    slug: "seasonic-prime-1000",
    category: "psu",
    name: "Seasonic Prime TX-1000",
    brand: "Seasonic",
    price: 11990,
    image: "/products/psu.svg",
    description: "1000 Вт, 80+ Titanium. Для топових збірок з RTX 4080/4090.",
    wattage: 1000,
    formFactor: "ATX",
  },

  // Case
  {
    slug: "lian-li-lancool-216",
    category: "case",
    name: "Lian Li Lancool 216",
    brand: "Lian Li",
    price: 4490,
    discount: 12,
    image: "/products/case.svg",
    description: "Mid-Tower ATX, відмінний airflow, загартоване скло.",
    supportedFormFactors: "ATX,mATX,ITX",
    maxGpuLengthMm: 392,
  },
  {
    slug: "fractal-north",
    category: "case",
    name: "Fractal Design North",
    brand: "Fractal",
    price: 5990,
    image: "/products/case.svg",
    description: "Преміальний корпус з дерев'яною передньою панеллю.",
    supportedFormFactors: "ATX,mATX,ITX",
    maxGpuLengthMm: 355,
  },
  {
    slug: "ncase-m1",
    category: "case",
    name: "NCASE M1 V6",
    brand: "NCASE",
    price: 9990,
    image: "/products/case.svg",
    description: "Компактний ITX-корпус для потужних міні-збірок.",
    supportedFormFactors: "ITX",
    maxGpuLengthMm: 320,
  },

  // Cooler
  {
    slug: "noctua-nh-u12a",
    category: "cooler",
    name: "Noctua NH-U12A",
    brand: "Noctua",
    price: 4590,
    image: "/products/cooler.svg",
    description: "Найкращий повітряний кулер. Універсальне кріплення.",
    supportedSockets: "LGA1700,AM5,AM4",
    maxTdp: 180,
  },
  {
    slug: "deepcool-ak620",
    category: "cooler",
    name: "DeepCool AK620",
    brand: "DeepCool",
    price: 2790,
    discount: 10,
    image: "/products/cooler.svg",
    description: "Двобаштовий кулер з відмінною продуктивністю.",
    supportedSockets: "LGA1700,AM5,AM4",
    maxTdp: 260,
  },
  {
    slug: "arctic-liquid-freezer-iii-360",
    category: "cooler",
    name: "Arctic Liquid Freezer III 360",
    brand: "Arctic",
    price: 5990,
    image: "/products/cooler.svg",
    description: "360 мм AIO СРО — впорається з найгарячішими чипами.",
    supportedSockets: "LGA1700,AM5,AM4",
    maxTdp: 350,
  },

  // Навушники
  {
    slug: "hyperx-cloud-iii",
    category: "headset",
    subtype: "headphones",
    name: "HyperX Cloud III",
    brand: "HyperX",
    price: 3990,
    discount: 25,
    image: "/products/headset.svg",
    description: "Дротові навушники 53 мм, мікрофон з шумозаглушенням.",
    connection: "USB/3.5mm",
    impedanceOhm: 64,
  },
  {
    slug: "steelseries-arctis-nova-7",
    category: "headset",
    subtype: "headphones",
    name: "SteelSeries Arctis Nova 7",
    brand: "SteelSeries",
    price: 8490,
    image: "/products/headset.svg",
    description: "Бездротові навушники з двосистемним підключенням.",
    connection: "Wireless/USB",
    impedanceOhm: 38,
  },
  {
    slug: "razer-blackshark-v2-pro",
    category: "headset",
    subtype: "headphones",
    name: "Razer BlackShark V2 Pro (2023)",
    brand: "Razer",
    price: 8990,
    image: "/products/headset.svg",
    description: "Бездротова гарнітура для турнірного геймінгу.",
    connection: "Wireless",
    impedanceOhm: 32,
  },
  {
    slug: "logitech-g-pro-x-2",
    category: "headset",
    subtype: "headphones",
    name: "Logitech G Pro X 2 Lightspeed",
    brand: "Logitech",
    price: 10490,
    image: "/products/headset.svg",
    description: "Графенові драйвери 50 мм, три режими підключення.",
    connection: "Wireless/USB/3.5mm",
    impedanceOhm: 38,
  },

  // Миші
  {
    slug: "logitech-g-pro-x-superlight-2",
    category: "headset",
    subtype: "mouse",
    name: "Logitech G Pro X Superlight 2",
    brand: "Logitech",
    price: 6990,
    image: "/products/mouse.svg",
    description: "Бездротова кіберспортивна миша, 60 г, сенсор Hero 2.",
    connection: "Wireless",
  },
  {
    slug: "razer-deathadder-v3-pro",
    category: "headset",
    subtype: "mouse",
    name: "Razer DeathAdder V3 Pro",
    brand: "Razer",
    price: 5990,
    image: "/products/mouse.svg",
    description: "Ергономічна бездротова миша, 63 г, сенсор Focus Pro 30K.",
    connection: "Wireless",
  },
  {
    slug: "zowie-ec2-cw",
    category: "headset",
    subtype: "mouse",
    name: "Zowie EC2-CW",
    brand: "Zowie",
    price: 5590,
    image: "/products/mouse.svg",
    description: "Бездротова миша для CS2, легендарна форма EC.",
    connection: "Wireless",
  },
  {
    slug: "steelseries-aerox-5",
    category: "headset",
    subtype: "mouse",
    name: "SteelSeries Aerox 5 Wireless",
    brand: "SteelSeries",
    price: 4690,
    image: "/products/mouse.svg",
    description: "Перфорована миша 74 г з 9 програмованими кнопками.",
    connection: "Wireless",
  },

  // Клавіатури
  {
    slug: "keychron-q1-max",
    category: "headset",
    subtype: "keyboard",
    name: "Keychron Q1 Max",
    brand: "Keychron",
    price: 10490,
    image: "/products/keyboard.svg",
    description: "75% алюмінієва клавіатура, hot-swap, бездротова.",
    connection: "Wireless/USB",
  },
  {
    slug: "wooting-60he",
    category: "headset",
    subtype: "keyboard",
    name: "Wooting 60HE",
    brand: "Wooting",
    price: 8990,
    image: "/products/keyboard.svg",
    description: "Магнітні перемикачі з Rapid Trigger, вибір актуації.",
    connection: "USB-C",
  },
  {
    slug: "razer-huntsman-v3-pro-tkl",
    category: "headset",
    subtype: "keyboard",
    name: "Razer Huntsman V3 Pro TKL",
    brand: "Razer",
    price: 8490,
    image: "/products/keyboard.svg",
    description: "Аналогові оптичні перемикачі, 8000 Hz polling.",
    connection: "USB-C",
  },
  {
    slug: "logitech-g915-tkl",
    category: "headset",
    subtype: "keyboard",
    name: "Logitech G915 TKL Lightspeed",
    brand: "Logitech",
    price: 9990,
    image: "/products/keyboard.svg",
    description: "Низькопрофільна бездротова механіка, GL-перемикачі.",
    connection: "Wireless/USB",
  },
];

const prebuilts = [
  {
    slug: "starter-fury",
    name: "RagePC Starter Fury",
    tier: "1080p",
    tagline: "1080p Ultra у будь-якій грі",
    description:
      "Збалансована збірка для входу в змагальний геймінг. Intel Core i5, RTX 4060, DDR5 — вистачить на всі популярні тайтли у Full HD з комфортним FPS.",
    parts: [
      "intel-i5-13400f",
      "rtx-4060",
      "asus-b760-plus",
      "kingston-fury-ddr5-32",
      "corsair-rm650e",
      "lian-li-lancool-216",
      "deepcool-ak620",
    ],
  },
  {
    slug: "apex-1440",
    name: "RagePC Apex 1440",
    tier: "1440p",
    tagline: "1440p/144Hz без компромісів",
    description:
      "Зв'язка Ryzen 7800X3D та RTX 4070 Super — король 1440p. Швидка DDR5-6400, корпус з відмінним airflow та тихий двобаштовий кулер.",
    parts: [
      "amd-ryzen-7-7800x3d",
      "rtx-4070-super",
      "gigabyte-b650-aorus",
      "corsair-vengeance-ddr5-32",
      "bequiet-straight-power-850",
      "fractal-north",
      "deepcool-ak620",
    ],
  },
  {
    slug: "overkill-4k",
    name: "RagePC Overkill 4K",
    tier: "4K",
    tagline: "4K-геймінг та стрімінг",
    description:
      "Максимум для 4K: Intel Core i7-13700K, RTX 4080 Super, 850-Ватний БЖ Platinum та 360-мм СРО. Запас потужності на роки вперед.",
    parts: [
      "intel-i7-13700k",
      "rtx-4080-super",
      "msi-z790-tomahawk",
      "corsair-vengeance-ddr5-32",
      "seasonic-prime-1000",
      "lian-li-lancool-216",
      "arctic-liquid-freezer-iii-360",
    ],
  },
  {
    slug: "compact-itx",
    name: "RagePC Compact ITX",
    tier: "mini",
    tagline: "Компактно та потужно",
    description:
      "Міні-збірка в корпусі NCASE M1: Ryzen 5 7600X та RX 7800 XT. Поміщається на столі, тягне 1440p та виглядає як преміум.",
    parts: [
      "amd-ryzen-5-7600x",
      "rx-7800-xt",
      "asrock-b650m-itx",
      "kingston-fury-ddr5-32",
      "corsair-rm650e",
      "ncase-m1",
      "noctua-nh-u12a",
    ],
  },
];

async function main() {
  console.log("Seeding database...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.buildComponent.deleteMany();
  await prisma.prebuiltBuild.deleteMany();
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`Created ${products.length} products.`);

  for (const b of prebuilts) {
    const { parts, ...rest } = b;
    const productRecords = await prisma.product.findMany({
      where: { slug: { in: parts } },
      select: { id: true, slug: true },
    });
    await prisma.prebuiltBuild.create({
      data: {
        ...rest,
        components: {
          create: productRecords.map((p) => ({ productId: p.id })),
        },
      },
    });
  }
  console.log(`Created ${prebuilts.length} prebuilt builds.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
