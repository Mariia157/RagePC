export type Lang = "uk" | "ru" | "en";

export const LANG_LABELS: Record<Lang, string> = {
  uk: "UA",
  ru: "RU",
  en: "EN",
};

const dict = {
  // Header
  "header.delivery": { uk: "Безкоштовна доставка від 2000 ₴", ru: "Бесплатная доставка от 2000 ₴", en: "Free shipping from 2000 ₴" },
  "header.warranty": { uk: "Гарантія 2 роки", ru: "Гарантия 2 года", en: "2-year warranty" },
  "header.search": { uk: "Пошук товарів...", ru: "Поиск товаров...", en: "Search products..." },
  "header.builds": { uk: "Готові збірки", ru: "Готовые сборки", en: "Prebuilt PCs" },
  "header.buildPC": { uk: "Зібрати ПК", ru: "Собрать ПК", en: "Build PC" },

  // Nav
  "nav.catalog": { uk: "Каталог", ru: "Каталог", en: "Catalog" },
  "nav.configurator": { uk: "Конфігуратор", ru: "Конфигуратор", en: "Configurator" },
  "nav.builds": { uk: "Готові збірки", ru: "Готовые сборки", en: "Prebuilt PCs" },
  "nav.peripherals": { uk: "Периферія", ru: "Периферия", en: "Peripherals" },
  "nav.tradein": { uk: "Trade-In", ru: "Trade-In", en: "Trade-In" },
  "nav.sales": { uk: "Акції", ru: "Акции", en: "Sales" },

  // Categories
  "cat.cpu": { uk: "Процесори", ru: "Процессоры", en: "Processors" },
  "cat.motherboard": { uk: "Материнські плати", ru: "Материнские платы", en: "Motherboards" },
  "cat.gpu": { uk: "Відеокарти", ru: "Видеокарты", en: "Graphics Cards" },
  "cat.ram": { uk: "Оперативна пам'ять", ru: "Оперативная память", en: "RAM" },
  "cat.ssd": { uk: "Накопичувачі SSD", ru: "SSD-накопители", en: "SSD Drives" },
  "cat.hdd": { uk: "Накопичувачі HDD", ru: "HDD-накопители", en: "HDD Drives" },
  "cat.psu": { uk: "Блоки живлення", ru: "Блоки питания", en: "Power Supplies" },
  "cat.case": { uk: "Корпуси", ru: "Корпуса", en: "Cases" },
  "cat.air_cooler": { uk: "Повітряне охолодження", ru: "Воздушное охлаждение", en: "Air Cooling" },
  "cat.water_cooler": { uk: "Водяне охолодження", ru: "Водяное охлаждение", en: "Water Cooling" },
  "cat.sound_card": { uk: "Звукові карти", ru: "Звуковые карты", en: "Sound Cards" },
  "cat.network_card": { uk: "Мережеві карти", ru: "Сетевые карты", en: "Network Cards" },
  "cat.headset": { uk: "Периферія", ru: "Периферия", en: "Peripherals" },

  // Category descriptions (catalog dropdown)
  "cat.cpu.desc": { uk: "Intel Core, AMD Ryzen", ru: "Intel Core, AMD Ryzen", en: "Intel Core, AMD Ryzen" },
  "cat.motherboard.desc": { uk: "ASUS, MSI, Gigabyte, ASRock", ru: "ASUS, MSI, Gigabyte, ASRock", en: "ASUS, MSI, Gigabyte, ASRock" },
  "cat.gpu.desc": { uk: "NVIDIA GeForce, AMD Radeon", ru: "NVIDIA GeForce, AMD Radeon", en: "NVIDIA GeForce, AMD Radeon" },
  "cat.ram.desc": { uk: "DDR4, DDR5", ru: "DDR4, DDR5", en: "DDR4, DDR5" },
  "cat.ssd.desc": { uk: "NVMe, SATA, M.2", ru: "NVMe, SATA, M.2", en: "NVMe, SATA, M.2" },
  "cat.hdd.desc": { uk: "Seagate, WD, Toshiba", ru: "Seagate, WD, Toshiba", en: "Seagate, WD, Toshiba" },
  "cat.psu.desc": { uk: "Corsair, be quiet!, Seasonic", ru: "Corsair, be quiet!, Seasonic", en: "Corsair, be quiet!, Seasonic" },
  "cat.case.desc": { uk: "ATX, mATX, ITX", ru: "ATX, mATX, ITX", en: "ATX, mATX, ITX" },
  "cat.air_cooler.desc": { uk: "Noctua, DeepCool, be quiet!", ru: "Noctua, DeepCool, be quiet!", en: "Noctua, DeepCool, be quiet!" },
  "cat.water_cooler.desc": { uk: "AIO СВО 240/280/360 мм", ru: "AIO СВО 240/280/360 мм", en: "AIO 240/280/360mm" },
  "cat.sound_card.desc": { uk: "Creative, ASUS, Focusrite", ru: "Creative, ASUS, Focusrite", en: "Creative, ASUS, Focusrite" },
  "cat.network_card.desc": { uk: "1/2.5/10 Гбіт, Wi-Fi", ru: "1/2.5/10 Гбит, Wi-Fi", en: "1/2.5/10 Gbps, Wi-Fi" },
  "cat.headset.desc": { uk: "Навушники, миші, клавіатури", ru: "Наушники, мыши, клавиатуры", en: "Headsets, mice, keyboards" },
  "cat.tradein.desc": { uk: "Обміняй стару техніку", ru: "Обменяй старую технику", en: "Trade your old tech" },

  // Home page
  "home.badge": { uk: "Новий сезон збірок", ru: "Новый сезон сборок", en: "New build season" },
  "home.hero.title1": { uk: "Збери ПК своєї", ru: "Собери ПК своей", en: "Build the PC of your" },
  "home.hero.title2": { uk: " люті", ru: " мечты", en: " dreams" },
  "home.hero.desc": { uk: "RagePC — розумний конфігуратор, перевірені комплектуючі та ігрова периферія. Жодної несумісності, жодних компромісів.", ru: "RagePC — умный конфигуратор, проверенные комплектующие и игровая периферия. Никакой несовместимости, никаких компромиссов.", en: "RagePC — smart configurator, verified components and gaming peripherals. No incompatibility, no compromises." },
  "home.openConfigurator": { uk: "Відкрити конфігуратор", ru: "Открыть конфигуратор", en: "Open configurator" },
  "home.goToCatalog": { uk: "Перейти до каталогу", ru: "Перейти в каталог", en: "Go to catalog" },
  "home.catalog": { uk: "Каталог", ru: "Каталог", en: "Catalog" },
  "home.allCategories": { uk: "Всі категорії", ru: "Все категории", en: "All categories" },
  "home.popular": { uk: "Популярні товари", ru: "Популярные товары", en: "Popular products" },
  "home.popularQueries": { uk: "Популярні запити", ru: "Популярные запросы", en: "Popular queries" },
  "home.pq.gpuNvidia": { uk: "Відеокарти NVIDIA", ru: "Видеокарты NVIDIA", en: "NVIDIA GPUs" },
  "home.pq.gpuAmd": { uk: "Відеокарти AMD", ru: "Видеокарты AMD", en: "AMD GPUs" },
  "home.pq.cpuIntel": { uk: "Процесори Intel", ru: "Процессоры Intel", en: "Intel CPUs" },
  "home.pq.cpuAmd": { uk: "Процесори AMD", ru: "Процессоры AMD", en: "AMD CPUs" },
  "home.pq.mbIntel": { uk: "Материнські плати для Intel", ru: "Материнские платы для Intel", en: "Intel Motherboards" },
  "home.pq.mbAmd": { uk: "Материнські плати для AMD", ru: "Материнские платы для AMD", en: "AMD Motherboards" },
  "home.pq.ramDdr5": { uk: "Оперативна пам'ять DDR5", ru: "Оперативная память DDR5", en: "DDR5 RAM" },
  "home.pq.gamingPc": { uk: "Ігрові ПК", ru: "Игровые ПК", en: "Gaming PCs" },
  "home.pq.gamingMice": { uk: "Ігрові мишки", ru: "Игровые мышки", en: "Gaming Mice" },
  "home.pq.gamingKeyboards": { uk: "Ігрові клавіатури", ru: "Игровые клавиатуры", en: "Gaming Keyboards" },
  "home.pq.gamingHeadsets": { uk: "Ігрові навушники", ru: "Игровые наушники", en: "Gaming Headsets" },
  "home.viewAll": { uk: "Дивитись всі", ru: "Смотреть все", en: "View all" },
  "home.readyBuilds": { uk: "Готові збірки", ru: "Готовые сборки", en: "Prebuilt PCs" },
  "home.allBuilds": { uk: "Усі збірки", ru: "Все сборки", en: "All builds" },
  "home.whyTitle": { uk: "Чому RagePC", ru: "Почему RagePC", en: "Why RagePC" },
  "home.ctaTitle": { uk: "Не знаєш, що обрати?", ru: "Не знаешь, что выбрать?", en: "Not sure what to choose?" },
  "home.ctaDesc": { uk: "Скористайся нашим конфігуратором — він автоматично перевірить сумісність усіх комплектуючих і допоможе зібрати ідеальний ПК.", ru: "Воспользуйся нашим конфигуратором — он автоматически проверит совместимость всех комплектующих и поможет собрать идеальный ПК.", en: "Use our configurator — it will automatically check compatibility of all components and help you build the perfect PC." },
  "home.tryConfigurator": { uk: "Спробувати конфігуратор", ru: "Попробовать конфигуратор", en: "Try configurator" },

  // Benefits
  "benefit.delivery": { uk: "Безкоштовна доставка", ru: "Бесплатная доставка", en: "Free shipping" },
  "benefit.delivery.desc": { uk: "Від 2000 ₴ по всій Україні", ru: "От 2000 ₴ по всей Украине", en: "From 2000 ₴ across Ukraine" },
  "benefit.warranty": { uk: "Гарантія 2 роки", ru: "Гарантия 2 года", en: "2-year warranty" },
  "benefit.warranty.desc": { uk: "На всі комплектуючі", ru: "На все комплектующие", en: "On all components" },
  "benefit.original": { uk: "Оригінал 100%", ru: "Оригинал 100%", en: "100% Original" },
  "benefit.original.desc": { uk: "Тільки офіційна продукція", ru: "Только официальная продукция", en: "Only official products" },
  "benefit.fast": { uk: "Швидка відправка", ru: "Быстрая отправка", en: "Fast shipping" },
  "benefit.fast.desc": { uk: "Відправляємо за 1 день", ru: "Отправляем за 1 день", en: "Ships in 1 day" },

  // Features
  "feature.configurator": { uk: "Розумний конфігуратор", ru: "Умный конфигуратор", en: "Smart configurator" },
  "feature.configurator.desc": { uk: "Автоматична перевірка сумісності сокетів, пам'яті, БЖ та форм-фактора.", ru: "Автоматическая проверка совместимости сокетов, памяти, БП и форм-фактора.", en: "Automatic compatibility check for sockets, memory, PSU and form factor." },
  "feature.builds": { uk: "Готові збірки", ru: "Готовые сборки", en: "Prebuilt PCs" },
  "feature.builds.desc": { uk: "Протестовані конфігурації для 1080p, 1440p та 4K-геймінгу.", ru: "Проверенные конфигурации для 1080p, 1440p и 4K-гейминга.", en: "Tested configurations for 1080p, 1440p and 4K gaming." },
  "feature.peripherals": { uk: "Ігрова периферія", ru: "Игровая периферия", en: "Gaming peripherals" },
  "feature.peripherals.desc": { uk: "Навушники, миші та клавіатури від перевірених брендів.", ru: "Наушники, мыши и клавиатуры от проверенных брендов.", en: "Headsets, mice and keyboards from trusted brands." },
  "feature.warranty2": { uk: "Гарантія 2 роки", ru: "Гарантия 2 года", en: "2-year warranty" },
  "feature.warranty2.desc": { uk: "На кожну зібрану конфігурацію та фірмову периферію.", ru: "На каждую собранную конфигурацию и фирменную периферию.", en: "On every built configuration and branded peripherals." },

  // Product
  "product.addToCart": { uk: "В кошик", ru: "В корзину", en: "Add to cart" },
  "product.adding": { uk: "Додаємо...", ru: "Добавляем...", en: "Adding..." },
  "product.added": { uk: "Додано", ru: "Добавлено", en: "Added" },
  "product.inStock": { uk: "В наявності", ru: "В наличии", en: "In stock" },
  "product.outOfStock": { uk: "Немає в наявності", ru: "Нет в наличии", en: "Out of stock" },
  "product.specs": { uk: "Характеристики", ru: "Характеристики", en: "Specifications" },
  "product.delivery": { uk: "Доставка", ru: "Доставка", en: "Delivery" },
  "product.deliveryDesc": { uk: "Нова Пошта, Укрпошта — від 1 дня", ru: "Нова Пошта, Укрпошта — от 1 дня", en: "Nova Poshta, Ukrposhta — from 1 day" },
  "product.warrantyTitle": { uk: "Гарантія", ru: "Гарантия", en: "Warranty" },
  "product.warrantyDesc": { uk: "Офіційна гарантія 24 місяці", ru: "Официальная гарантия 24 месяца", en: "Official warranty 24 months" },

  // Cart
  "cart.title": { uk: "Кошик", ru: "Корзина", en: "Cart" },
  "cart.empty": { uk: "Кошик порожній", ru: "Корзина пуста", en: "Cart is empty" },
  "cart.total": { uk: "Разом", ru: "Итого", en: "Total" },
  "cart.checkout": { uk: "Оформити замовлення", ru: "Оформить заказ", en: "Checkout" },

  // Favorites
  "fav.title": { uk: "Обране", ru: "Избранное", en: "Favorites" },
  "fav.empty": { uk: "Список обраного порожній", ru: "Список избранного пуст", en: "Favorites list is empty" },

  // Catalog
  "catalog.brand": { uk: "Бренд", ru: "Бренд", en: "Brand" },
  "catalog.all": { uk: "Усі", ru: "Все", en: "All" },
  "catalog.noProducts": { uk: "Товарів не знайдено.", ru: "Товаров не найдено.", en: "No products found." },
  "catalog.products": { uk: "товарів", ru: "товаров", en: "products" },
  "catalog.home": { uk: "Головна", ru: "Главная", en: "Home" },

  // Sort
  "sort.popular": { uk: "Популярні", ru: "Популярные", en: "Popular" },
  "sort.priceAsc": { uk: "Ціна (зрост.)", ru: "Цена (возр.)", en: "Price (asc)" },
  "sort.priceDesc": { uk: "Ціна (спад.)", ru: "Цена (убыв.)", en: "Price (desc)" },
  "sort.name": { uk: "За алфавітом", ru: "По алфавиту", en: "Alphabetical" },

  // Peripherals subtypes
  "subtype.headphones": { uk: "Навушники", ru: "Наушники", en: "Headsets" },
  "subtype.mouse": { uk: "Миша", ru: "Мышь", en: "Mouse" },
  "subtype.keyboard": { uk: "Клавіатура", ru: "Клавиатура", en: "Keyboard" },

  // Footer
  "footer.desc": { uk: "Інтернет-магазин комплектуючих, готових збірок та ігрової периферії.", ru: "Интернет-магазин комплектующих, готовых сборок и игровой периферии.", en: "Online store for components, prebuilt PCs and gaming peripherals." },
  "footer.catalog": { uk: "Каталог", ru: "Каталог", en: "Catalog" },
  "footer.service": { uk: "Сервіс", ru: "Сервис", en: "Service" },
  "footer.contacts": { uk: "Контакти", ru: "Контакты", en: "Contacts" },
  "footer.configurator": { uk: "Конфігуратор ПК", ru: "Конфигуратор ПК", en: "PC Configurator" },
  "footer.account": { uk: "Особистий кабінет", ru: "Личный кабинет", en: "My account" },
  "footer.schedule": { uk: "Пн-Пт 9:00-20:00", ru: "Пн-Пт 9:00-20:00", en: "Mon-Fri 9:00-20:00" },
  "footer.rights": { uk: "Усі права захищено.", ru: "Все права защищены.", en: "All rights reserved." },
  "footer.payment": { uk: "Оплата: Visa, Mastercard, ПриватБанк", ru: "Оплата: Visa, Mastercard, ПриватБанк", en: "Payment: Visa, Mastercard, PrivatBank" },
  "footer.shipping": { uk: "Доставка: Нова Пошта, Укрпошта", ru: "Доставка: Нова Пошта, Укрпошта", en: "Shipping: Nova Poshta, Ukrposhta" },

  // Spec labels
  "spec.socket": { uk: "Сокет", ru: "Сокет", en: "Socket" },
  "spec.tdp": { uk: "TDP", ru: "TDP", en: "TDP" },
  "spec.cores": { uk: "Ядра", ru: "Ядра", en: "Cores" },
  "spec.threads": { uk: "Потоки", ru: "Потоки", en: "Threads" },
  "spec.baseClock": { uk: "Базова частота", ru: "Базовая частота", en: "Base clock" },
  "spec.gpuLength": { uk: "Довжина відеокарти", ru: "Длина видеокарты", en: "GPU length" },
  "spec.gpuPower": { uk: "Енергоспоживання", ru: "Энергопотребление", en: "Power draw" },
  "spec.vram": { uk: "Відеопам'ять", ru: "Видеопамять", en: "VRAM" },
  "spec.ramType": { uk: "Тип пам'яті", ru: "Тип памяти", en: "Memory type" },
  "spec.ramSpeed": { uk: "Частота пам'яті", ru: "Частота памяти", en: "Memory speed" },
  "spec.ramCapacity": { uk: "Обсяг пам'яті", ru: "Объем памяти", en: "Memory capacity" },
  "spec.formFactor": { uk: "Форм-фактор", ru: "Форм-фактор", en: "Form factor" },
  "spec.supportedFF": { uk: "Підтримка форм-факторів", ru: "Поддержка форм-факторов", en: "Supported form factors" },
  "spec.maxGpuLength": { uk: "Макс. довжина GPU", ru: "Макс. длина GPU", en: "Max GPU length" },
  "spec.wattage": { uk: "Потужність", ru: "Мощность", en: "Wattage" },
  "spec.supportedSockets": { uk: "Підтримка сокетів", ru: "Поддержка сокетов", en: "Supported sockets" },
  "spec.maxTdp": { uk: "Макс. TDP охолодження", ru: "Макс. TDP охлаждения", en: "Max cooling TDP" },
  "spec.connection": { uk: "Підключення", ru: "Подключение", en: "Connection" },
  "spec.impedance": { uk: "Імпеданс", ru: "Импеданс", en: "Impedance" },
  "spec.capacityGb": { uk: "Об'єм", ru: "Объём", en: "Capacity" },
  "spec.capacityTb": { uk: "Об'єм", ru: "Объём", en: "Capacity" },
  "spec.readSpeed": { uk: "Швидкість читання", ru: "Скорость чтения", en: "Read speed" },
  "spec.writeSpeed": { uk: "Швидкість запису", ru: "Скорость записи", en: "Write speed" },
  "spec.interfaceType": { uk: "Інтерфейс", ru: "Интерфейс", en: "Interface" },
  "spec.rpm": { uk: "Обертів за хв.", ru: "Оборотов в мин.", en: "RPM" },
  "spec.cache": { uk: "Кеш", ru: "Кэш", en: "Cache" },
  "spec.radiator": { uk: "Радіатор", ru: "Радиатор", en: "Radiator" },
  "spec.channels": { uk: "Канали", ru: "Каналы", en: "Channels" },
  "spec.sampleRate": { uk: "Частота дискретизації", ru: "Частота дискретизации", en: "Sample rate" },
  "spec.bitDepth": { uk: "Розрядність", ru: "Разрядность", en: "Bit depth" },
  "spec.networkSpeed": { uk: "Швидкість мережі", ru: "Скорость сети", en: "Network speed" },
  "spec.wireless": { uk: "Wi-Fi", ru: "Wi-Fi", en: "Wi-Fi" },

  // Sales
  "sales.title": { uk: "Акції", ru: "Акции", en: "Sales" },
  "sales.count": { uk: "товарів зі знижкою", ru: "товаров со скидкой", en: "products on sale" },
  "sales.empty": { uk: "Наразі немає активних акцій.", ru: "Сейчас нет активных акций.", en: "No active sales right now." },

  // Build card
  "build.config": { uk: "Конфігурація", ru: "Конфигурация", en: "Configuration" },
  "build.total": { uk: "Загалом", ru: "Итого", en: "Total" },
  "build.catLabels.cpu": { uk: "Процесор", ru: "Процессор", en: "CPU" },
  "build.catLabels.gpu": { uk: "Відеокарта", ru: "Видеокарта", en: "GPU" },
  "build.catLabels.motherboard": { uk: "Мат. плата", ru: "Мат. плата", en: "Motherboard" },
  "build.catLabels.ram": { uk: "ОЗП", ru: "ОЗУ", en: "RAM" },
  "build.catLabels.psu": { uk: "Блок живлення", ru: "Блок питания", en: "PSU" },
  "build.catLabels.case": { uk: "Корпус", ru: "Корпус", en: "Case" },
  "build.catLabels.air_cooler": { uk: "Повітряне охолодження", ru: "Воздушное охлаждение", en: "Air Cooler" },
  "build.catLabels.water_cooler": { uk: "Водяне охолодження", ru: "Водяное охлаждение", en: "Water Cooler" },

  // Builder
  "builder.select": { uk: "Обрати для збірки", ru: "Выбрать для сборки", en: "Select for build" },
  "builder.remove": { uk: "Прибрати зі збірки", ru: "Убрать из сборки", en: "Remove from build" },
  "builder.selected": { uk: "Обрано", ru: "Выбрано", en: "Selected" },
  "builder.yourBuild": { uk: "Ваша збірка", ru: "Ваша сборка", en: "Your build" },
  "builder.emptyBuild": { uk: "Поки нічого не обрано. Почніть з процесора.", ru: "Пока ничего не выбрано. Начните с процессора.", en: "Nothing selected yet. Start with a CPU." },
  "builder.consumption": { uk: "Оцінка споживання", ru: "Оценка потребления", en: "Est. power draw" },
  "builder.issues": { uk: "Проблеми сумісності", ru: "Проблемы совместимости", en: "Compatibility issues" },
} as const;

export type DictKey = keyof typeof dict;

export function t(key: DictKey, lang: Lang): string {
  return dict[key]?.[lang] ?? dict[key]?.["uk"] ?? key;
}
