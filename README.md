# RagePC

An online store for PC components, prebuilt systems and gaming peripherals. Its centerpiece is the configurator: it walks you from the CPU to the power supply and, at every step, hides the parts that won't fit what you have already picked.

The storefront interface is in Ukrainian, with Russian and English available.

![Home page](docs/rage-home.webp)

## Features

- **Configurator with compatibility checks.** CPU and motherboard socket, memory type, motherboard and case form factor, GPU length, cooler TDP. Incompatible options are blocked with an explanation.
- **Power estimate.** The configurator adds up the build's power draw and filters out power supplies without enough headroom.
- **Prebuilt PCs.** Tested configurations for 1080p, 1440p and 4K, plus a compact ITX build.
- **Catalog.** Categories, filters by price, brand and specs, sorting, sales.
- **Checkout flow.** Favorites, cart, checkout, sign-up and an account page with order history.
- **Trade-In** for old hardware.
- **Three interface languages** (Ukrainian, Russian, English), light and dark themes, responsive layout.

![Configurator](docs/rage-configure.webp)

| Prebuilt PCs | Phone |
|---|---|
| ![Prebuilt PCs](docs/rage-builds.webp) | <img src="docs/rage-mobile.webp" alt="Mobile layout" width="220"> |

## Stack

- **Next.js 16** (App Router, Server Actions), **React 19**, **TypeScript**
- **Prisma 7** + **PostgreSQL** via `@prisma/adapter-pg`
- **Tailwind CSS v4**, **lucide-react** icons
- Cookie-based sessions, passwords hashed with **bcryptjs**

The compatibility logic lives in [`src/lib/compatibility.ts`](src/lib/compatibility.ts), translations in [`src/lib/i18n.ts`](src/lib/i18n.ts).

## Running locally

Requires Node.js 20+ and PostgreSQL.

```bash
npm install
echo 'DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ragepc"' > .env
npx prisma migrate deploy
npx prisma generate
npx tsx prisma/seed.ts      # 53 products and 4 prebuilt PCs
npm run dev                 # http://localhost:3000
```
