"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-on-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center bg-vayana-cream overflow-hidden border-b border-vayana-gold/30"
      aria-label="Hero campaign"
    >
      {/* Subtle Background Ambient Dots */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none hero-dot-pattern"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Editorial Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">

            {/* Eyebrow label */}
            <div className="inline-flex items-center space-x-3 mb-5 reveal-on-scroll">
              <span className="h-[1px] w-8 bg-vayana-gold" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-widest-luxury text-vayana-maroon font-semibold">
                AUTUMN / WINTER ATELIER 2025 • ODISHA HANDLOOM
              </span>
            </div>

            {/* Hero Main Statement */}
            <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-vayana-charcoal uppercase font-normal mb-8 reveal-on-scroll">
              WEAR<br />
              YOUR<br />
              <span className="italic font-normal text-vayana-maroon">HERITAGE.</span>
            </h1>

            {/* Manifesto Copy */}
            <p className="font-editorial-serif text-lg sm:text-xl md:text-2xl text-vayana-charcoal/80 max-w-xl font-light leading-relaxed mb-10 reveal-on-scroll">
              Woven with sacred tradition. Sculpted for the contemporary connoisseur. Rare Sambalpuri Bandha &amp;
              Bomkai silks handcrafted on centuries-old wooden pit looms in the heartlands of Odisha.
            </p>

            {/* Dual Luxury Actions */}
            <div className="flex flex-wrap items-center gap-6 reveal-on-scroll">
              <a
                href="#collection"
                className="inline-flex items-center justify-center px-8 py-4 bg-vayana-maroon text-vayana-cream text-xs uppercase tracking-mega-luxury border border-vayana-gold hover:bg-vayana-crimson transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                EXPLORE THE COLLECTION <span className="ml-3 text-vayana-gold">→</span>
              </a>
              <a
                href="#story"
                className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-vayana-charcoal hover:text-vayana-maroon transition-colors group"
              >
                <span className="mr-2 text-vayana-gold">◆</span>
                <span className="border-b border-vayana-charcoal/50 group-hover:border-vayana-maroon pb-0.5">
                  Discover Our Sacred Story
                </span>
              </a>
            </div>

            {/* Micro Weaver Badge */}
            <div className="mt-12 pt-6 border-t border-vayana-gold/20 flex items-center gap-6 reveal-on-scroll">
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="inline-flex w-8 h-8 rounded-full border border-vayana-gold bg-vayana-sand items-center justify-center text-[10px] font-serif text-vayana-charcoal">
                  GI
                </span>
                <span className="inline-flex w-8 h-8 rounded-full border border-vayana-gold bg-vayana-parchment items-center justify-center text-[10px] font-serif text-vayana-maroon">
                  100%
                </span>
              </div>
              <p className="text-[11px] text-vayana-charcoal/70 tracking-wide font-sans leading-tight max-w-xs">
                Each drape is assigned a weaver provenance certificate and individual archive loom registry number.
              </p>
            </div>
          </div>

          {/* Right Visual Showcase Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end reveal-on-scroll">
            <div className="relative w-full max-w-md gold-corner-frame">
              {/* Main Editorial Photograph */}
              <div className="overflow-hidden shadow-2xl border border-vayana-gold/40 bg-vayana-parchment relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-volyhwMaESvlSKJXljofrPBT4fAllPOkDtMR_W_IIjlwa9Yu2sOAcyQqSv0JjP6fSR9rJr5RSvZNo247LKwzLyJep5L2ANaJKn5gqZQm_wOdSFTs6uyuLcmBX0U0WLv1h0ZrlM4eVep1GIEDpt-0r23sHYU1V-D6hmMMBDECzRo22G1rr2bisu3QDO5NP-U2qT0xzYfErvx-LVkgrAdpFk_4RowYFzoDjz6Vkk1OOXPN1u1lpdf0"
                  alt="Editorial luxury photograph of an Indian model draped in Sambalpuri Odisha silk saree"
                  width={500}
                  height={667}
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />

                {/* Floating Edition Plaque */}
                <div className="absolute bottom-4 left-4 right-4 bg-vayana-charcoal/90 backdrop-blur-md p-3.5 border border-vayana-gold/40 text-vayana-cream">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-vayana-gold mb-1">
                    <span>SAMBALPURI SILK IKAT</span>
                    <span className="text-white font-mono">EDITION OF 12</span>
                  </div>
                  <p className="font-editorial-serif text-xs text-vayana-sand italic font-light">
                    Hand-tied warp &amp; weft in deep crimson madder and antique gold filaments.
                  </p>
                </div>
              </div>

              {/* Lotus Emblem Accent */}
              <div className="absolute -top-5 -left-5 bg-vayana-cream border border-vayana-gold p-2 shadow-lg hidden sm:block">
                <span className="text-vayana-maroon font-serif text-xs uppercase tracking-widest">ODISHA • 1948</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
