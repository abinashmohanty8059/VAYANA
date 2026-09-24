import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope, Pinyon_Script } from "next/font/google";
import Preloader from "@/components/motion/Preloader";
import Cursor from "@/components/motion/Cursor";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VAYANA TEXTILES — Wear Your Heritage | Handcrafted Luxury Odisha Silks",
  description:
    "Premium Odisha handloom textiles – Sambalpuri Silk, Bomkai Ikat, and Kotpad weaves handcrafted by master weavers. GI-tagged authentic luxury silks.",
  keywords: "Sambalpuri silk, Odisha handloom, Bomkai saree, Ikat saree, heritage textiles, luxury Indian textiles",
  openGraph: {
    title: "VAYANA TEXTILES — Wear Your Heritage",
    description: "Rare Sambalpuri Bandha & Bomkai silks handcrafted on centuries-old wooden pit looms in Odisha.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0d0c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${manrope.variable} ${pinyon.variable} is-loading`}
      suppressHydrationWarning
    >
      <body className="bg-ivory text-ink font-sans antialiased overflow-x-hidden">
        <Preloader />
        <Cursor />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
