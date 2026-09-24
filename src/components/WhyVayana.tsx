"use client";

import { useEffect, useRef } from "react";

const PILLARS = [
  {
    icon: (
      <svg className="w-10 h-10 text-vayana-maroon" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <path d="M7 3v18" />
        <path d="M12 3v18" />
        <path d="M17 3v18" />
        <path d="M3 12h18" />
      </svg>
    ),
    title: "HANDWOVEN WITH LOVE",
    body: "Zero automated power-looms. Every millimeter passes through rhythmic pedal movements and artisan fingers.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-vayana-maroon" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path d="M12 2L9 8h6l-3-6z" />
        <path d="M12 8v14" />
        <path d="M12 14l-5-3" />
        <path d="M12 18l5-3" />
      </svg>
    ),
    title: "SUSTAINABLE FASHION",
    body: "Non-toxic natural vegetable vats, biodegradable pure tussar silks, and zero waste textile philosophy.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-vayana-maroon" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <rect height="10" transform="rotate(45 12 12)" width="10" x="7" y="7" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "ROOTED IN HERITAGE",
    body: "Direct weaver patronages guaranteeing dignified living wages and generational trade longevity.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-vayana-maroon" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="5" />
        <path d="M8 14l-3 7 7-3 7 3-3-7" />
      </svg>
    ),
    title: "MADE FOR YOU",
    body: "Custom pallu inscriptions, bridal consultations, and numbered registry paperwork in every bespoke box.",
  },
];

export default function WhyVayana() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-on-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
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
      id="pillars"
      className="py-20 bg-vayana-parchment border-y border-vayana-gold/30"
      aria-label="Brand pillars"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-[11px] uppercase tracking-mega-luxury text-vayana-maroon font-semibold">
            THE VAYANA COMMITMENT
          </span>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl text-vayana-charcoal uppercase font-normal mt-1">
            Sacred Trust &amp; Craft Integrity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col items-center text-center p-4 reveal-on-scroll"
            >
              <div className="w-20 h-20 rounded-full border-2 border-vayana-maroon flex items-center justify-center bg-vayana-cream mb-4 shadow-sm">
                {pillar.icon}
              </div>
              <h3 className="font-luxury-display text-xs tracking-widest uppercase text-vayana-charcoal font-semibold">
                {pillar.title}
              </h3>
              <p className="text-xs text-vayana-charcoal/70 font-sans mt-2 leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
