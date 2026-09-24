import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-montserrat",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cinzel.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-vayana-cream text-vayana-charcoal antialiased font-sans overflow-x-hidden selection:bg-vayana-maroon selection:text-vayana-cream">
        {children}
      </body>
    </html>
  );
}
