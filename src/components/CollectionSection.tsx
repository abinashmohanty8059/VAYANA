"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  category: string;
  badge: string;
  badgeStyle: string;
  image: string;
  alt: string;
  weaveType: string;
  name: string;
  subtitle: string;
  price: string;
  priceUSD: string;
  swatches: string[];
  quickViewDesc: string;
}

const PRODUCTS: Product[] = [
  {
    id: "neelambari",
    category: "sambalpuri",
    badge: "Masterpiece",
    badgeStyle: "bg-vayana-charcoal text-vayana-gold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-volyhwMaESvlSKJXljofrPBT4fAllPOkDtMR_W_IIjlwa9Yu2sOAcyQqSv0JjP6fSR9rJr5RSvZNo247LKwzLyJep5L2ANaJKn5gqZQm_wOdSFTs6uyuLcmBX0U0WLv1h0ZrlM4eVep1GIEDpt-0r23sHYU1V-D6hmMMBDECzRo22G1rr2bisu3QDO5NP-U2qT0xzYfErvx-LVkgrAdpFk_4RowYFzoDjz6Vkk1OOXPN1u1lpdf0",
    alt: "The Neelambari Sambalpuri Silk Saree",
    weaveType: "Odisha Double Ikat",
    name: "The Neelambari Silk Saree",
    subtitle: "Crafted over 42 days by Master Weaver Rameshwar Meher",
    price: "₹48,500",
    priceUSD: "$580",
    swatches: ["#7A1B1C", "#C5A059", "#141312"],
    quickViewDesc: "Pure mulberry silk with intricate double-Ikat Bandha borders in deep crimson maroon and antique gold threads.",
  },
  {
    id: "bomkai",
    category: "bomkai",
    badge: "Pure Bomkai",
    badgeStyle: "bg-vayana-maroon text-vayana-cream",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9GWQUIpIrs81E8-MKzUPQ43j0v--X7JJiP-WBI3eKE1Z7llgvf3CN2_6icP8YnoWAFPwu0bt6C5hN8u7o4itZvIq8Sjv75uFVy12jiFVCQ5Ybljll1Try_OaD7OmdY6OF-j3-5-CCq4BWiQkivN2nmWPJSnPzGSl6ZzNDQhS0pypF85_w0CpuDbHaZddPSIVpkbyjl4iiLamYBpguVZzwo2od80p7ISwKVhOSypJX-osOQlGpCo4O",
    alt: "The Bomkai Royal Heirloom Drapes",
    weaveType: "Ganjam Bomkai Weave",
    name: "The Bomkai Royal Heirloom",
    subtitle: "Woven with antique zari filaments & Kumbha borders",
    price: "₹62,000",
    priceUSD: "$745",
    swatches: ["#5C1415", "#D4AF37"],
    quickViewDesc: "Folded Bomkai silk saree highlighting the iconic temple border (kumbha) and geometric diamond lozenges.",
  },
  {
    id: "kalinga",
    category: "dupattas",
    badge: "Festive Edit",
    badgeStyle: "bg-vayana-charcoal text-vayana-gold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC4E8uceW9-3fAzWIds4SCn-1TTzTCZQ-swWs6OSgbxQ8b_eLLVcz5q60YVzZxGMVFRtfFnDXQlHGtYa5UPgk9B6tKns2QSkvPc6VP3s4oxNX85jbDsJmSCZ6aRAkeqbuFs3B3L3CQWRKu_cbbvV65QQmbjJOBmyr9iaiQUE8DCJ2pWOxOAR-g7I0ewdTwgchav5x71tOF3q4Q4j5Vw3Yt3kKYYG9JA7O4wSCH-Jmc1gtqqRlFnDic",
    alt: "Kalinga Crimson Festival Dupatta",
    weaveType: "Odisha Silk Dupatta",
    name: "Kalinga Crimson Dupatta",
    subtitle: "Tasselled pallu in contrasting Royal Indigo & Ochre",
    price: "₹24,000",
    priceUSD: "$290",
    swatches: ["#B24C19", "#1B2A4A", "#C5A059"],
    quickViewDesc: "Flowing handwoven Odisha silk stole featuring royal blue borders and golden rust orange base.",
  },
  {
    id: "tussar",
    category: "sambalpuri",
    badge: "Artisan Loom Rare",
    badgeStyle: "bg-vayana-gold text-vayana-charcoal font-bold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnDcyT2vnU4s7Zmh3lMAggVZXZ1LJNEv5KWHicnn9gl_H8nBcl2r3jqr51Sq6QubC1-Ppg7vO8hU-BnLoQd0RthpMD0OFyPFYDYMoHdTLKPhnMAEPXXN7DuryuVzY4PEkDN4kS0SE0u3UJM5imuCjgw1ASNxFfE0fk7oz80PjA40qgl0OqyrsmugA-8rxiegZkKWA11wB1mxRAq5AjJ-MlFcdescI8ky8SHYjW-kSZ4dtC1CrZ9YaN",
    alt: "Artisan Pit Loom Tussar Silk Saree",
    weaveType: "Tussar Pit Loom Weave",
    name: "Utkala Tussar Bandha Silk",
    subtitle: "Featuring Shankha (Conch) & Lotus geometric repeats",
    price: "₹36,000",
    priceUSD: "$435",
    swatches: ["#8C2224", "#B89047"],
    quickViewDesc: "Woven on organic wooden pit looms with hand-twisted wild tussar raw yarn.",
  },
];

const FILTERS = [
  { key: "all", label: "ALL PIECES" },
  { key: "sambalpuri", label: "SAMBALPURI SILK" },
  { key: "bomkai", label: "BOMKAI IKAT" },
  { key: "dupattas", label: "DUPATTAS & STOLES" },
];

interface ModalData {
  name: string;
  price: string;
  priceUSD: string;
  desc: string;
}

export default function CollectionSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [modal, setModal] = useState<ModalData | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-on-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function addToCart(name: string) {
    setCartCount((c) => c + 1);
    (window as any).__vayanaAddToCart?.();
    setToast(name);
    setTimeout(() => setToast(null), 3200);
  }

  const filtered = activeFilter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="py-24 bg-vayana-cream relative"
      aria-label="Product showcase"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-vayana-gold/20 pb-6 reveal-on-scroll">
          <div>
            <span className="text-[11px] uppercase tracking-widest-luxury text-vayana-maroon font-semibold">
              02 / ATELIER CURATIONS
            </span>
            <h2 className="font-editorial-serif text-4xl sm:text-5xl text-vayana-charcoal uppercase font-normal mt-1">
              THE COLLECTION
            </h2>
            <p className="font-editorial-serif text-lg text-vayana-charcoal/70 italic mt-1">
              &ldquo;Tradition, woven into every thread.&rdquo;
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 text-[10px] uppercase tracking-widest">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                type="button"
                className={`px-4 py-2 transition-colors ${
                  activeFilter === key
                    ? "bg-vayana-charcoal text-vayana-cream"
                    : "bg-transparent text-vayana-charcoal hover:bg-vayana-sand/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product, i) => (
            <article
              key={product.id}
              className="product-card group flex flex-col bg-vayana-cream border border-vayana-sand transition-all duration-300 hover:shadow-xl reveal-on-scroll"
            >
              {/* Image Area */}
              <div className="relative overflow-hidden bg-vayana-parchment aspect-[3/4]">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badge */}
                <div className={`absolute top-3 right-3 text-[9px] uppercase tracking-widest px-2.5 py-1 ${product.badgeStyle}`}>
                  {product.badge}
                </div>

                {/* Hover Action Drawer */}
                <div className="hover-drawer absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-vayana-charcoal/90 via-vayana-charcoal/60 to-transparent flex flex-col gap-2">
                  <button
                    className="w-full py-2.5 bg-vayana-cream text-vayana-charcoal text-[10px] uppercase tracking-widest hover:bg-vayana-gold hover:text-white transition-colors"
                    onClick={() =>
                      setModal({
                        name: product.name,
                        price: product.price,
                        priceUSD: product.priceUSD,
                        desc: product.quickViewDesc,
                      })
                    }
                    type="button"
                  >
                    Quick View Details
                  </button>
                  <button
                    className="w-full py-2 bg-vayana-maroon text-vayana-cream text-[10px] uppercase tracking-widest hover:bg-vayana-crimson transition-colors"
                    onClick={() => addToCart(product.name)}
                    type="button"
                  >
                    Add To Curation
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-vayana-maroon font-semibold">
                    {product.weaveType}
                  </span>
                  <h3 className="font-editorial-serif text-xl text-vayana-charcoal group-hover:text-vayana-maroon transition-colors mt-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-vayana-charcoal/60 mt-1 font-light italic">{product.subtitle}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-vayana-borderMuted flex items-center justify-between">
                  <span className="text-sm font-editorial-serif font-semibold text-vayana-charcoal">
                    {product.price}{" "}
                    <span className="text-xs text-vayana-charcoal/50 font-normal">({product.priceUSD})</span>
                  </span>
                  {/* Color Swatches */}
                  <div className="flex items-center space-x-1.5" title="Natural organic dye palette">
                    {product.swatches.map((color) => (
                      <span
                        key={color}
                        className="w-2.5 h-2.5 rounded-full border border-white"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center reveal-on-scroll">
          <a
            href="#collection"
            className="inline-flex items-center justify-center px-10 py-4 border border-vayana-charcoal text-xs uppercase tracking-widest font-medium hover:bg-vayana-charcoal hover:text-vayana-cream transition-all duration-300"
          >
            VIEW ALL 36 ARCHIVE PIECES
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Product quick view"
        >
          <div className="bg-vayana-cream border-2 border-vayana-gold max-w-lg w-full p-6 md:p-8 relative shadow-2xl">
            <button
              className="absolute top-4 right-4 text-vayana-charcoal hover:text-vayana-maroon text-lg"
              onClick={() => setModal(null)}
              type="button"
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="flex items-center space-x-2 text-vayana-gold text-[10px] uppercase tracking-widest mb-2">
              <span>◆</span>
              <span>ATELIER SPECIFICATION</span>
            </div>
            <h3 className="font-editorial-serif text-3xl text-vayana-charcoal mb-2">{modal.name}</h3>
            <div className="text-sm font-semibold text-vayana-maroon mb-4 font-sans">
              {modal.price} ({modal.priceUSD})
            </div>
            <p className="text-xs text-vayana-charcoal/80 font-sans leading-relaxed mb-6">{modal.desc}</p>
            <div className="border-t border-vayana-borderMuted pt-4 space-y-2 text-[11px] text-vayana-charcoal/70">
              <div><strong>Origin:</strong> Nuapatna / Sambalpur Handloom Cluster</div>
              <div><strong>Fabric:</strong> 100% Pure Mulberry Silk &amp; Real Antique Zari</div>
              <div><strong>Weave Duration:</strong> 42 Days of Single-Loom Dedication</div>
              <div><strong>Care:</strong> Dry Clean Only in Heirloom Muslin Wrapping</div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                className="flex-1 py-3 bg-vayana-maroon text-vayana-cream text-xs uppercase tracking-widest hover:bg-vayana-crimson transition-colors"
                onClick={() => { addToCart(modal.name); setModal(null); }}
                type="button"
              >
                Add Piece to Bag
              </button>
              <button
                className="px-5 py-3 border border-vayana-charcoal text-vayana-charcoal text-xs uppercase tracking-widest hover:bg-vayana-sand/40 transition-colors"
                onClick={() => setModal(null)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-vayana-charcoal text-vayana-cream border border-vayana-gold p-4 shadow-2xl"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <span className="text-vayana-gold text-lg">✓</span>
            <div>
              <p className="text-xs font-semibold text-vayana-cream">&ldquo;{toast}&rdquo; added to your curation.</p>
              <p className="text-[10px] text-vayana-sand/70">Complimentary insured transit applied.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
