import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FavoritesProvider from "@/components/FavoritesProvider";
import ThemeProvider from "@/components/ThemeProvider";
import LangProvider from "@/components/LangProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RagePC — збірка ПК та ігрова периферія",
  description:
    "Інтернет-магазин RagePC: комплектуючі, готові збірки, розумний конфігуратор сумісності та ігрова периферія.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <LangProvider>
            <FavoritesProvider>
              <Header />
              <main id="top" className="flex-1">{children}</main>
              <Footer />
            </FavoritesProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
