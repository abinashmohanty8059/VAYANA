"use client";

import { useEffect, useRef } from "react";

const MOTIFS = [
  {
    name: "PADMA",
    subtitle: "The Sacred Lotus",
    description:
      "Represents purity of soul and timeless spiritual rebirth. Woven along the temple borders as an invitation to tranquility and spiritual bloom.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
        <path d="M12 3c-1.5 3-4 6-4 9 0 3 2.5 5 4 5s4-2 4-5c0-3-2.5-6-4-9z" />
        <path d="M7 9c-2 2-3 5-2 7 1 2 4 2 6 1" />
        <path d="M17 9c2 2 3 5 2 7-1 2-4 2-6 1" />
        <path d="M4 16c2 2 5 2 7 1" />
        <path d="M20 16c-2 2-5 2-7 1" />
      </svg>
    ),
  },
  {
    name: "MAYURA",
    subtitle: "The Royal Peacock",
    description:
      "Embodied prominently in the Vayana crest. Symbolizes grace, majesty, and celebratory monsoon arrival across the royal courts of Utkala.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" x2="2" y1="8" y2="22" />
        <line x1="17.5" x2="9" y1="15" y2="15" />
      </svg>
    ),
  },
  {
    name: "KUMBHA",
    subtitle: "Temple Spire Border",
    description:
      "The serrated triangular temple design along the selvedge edge. Built to protect the wearer and channel the divine aura of Puri Jagannath temple.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
        <path d="M12 2L4 12h5v8h6v-8h5L12 2z" />
        <path d="M2 22h20" />
      </svg>
    ),
  },
  {
    name: "SHANKHA",
    subtitle: "The Sacred Conch",
    description:
      "Auspicious resonance and the eternal sound of universal creation (Om). Woven into the pallu as a protective harbinger of peace and fortune.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 0 0 18v-4a5 5 0 0 0 0-10V3z" />
      </svg>
    ),
  },
];

export default function MotifsSection() {
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
      id="motifs"
      className="py-24 bg-vayana-cream relative"
      aria-label="Cultural motifs"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-[11px] uppercase tracking-mega-luxury text-vayana-maroon font-semibold">
            04 / THE SACRED CODEX
          </span>
          <h2 className="font-editorial-serif text-4xl sm:text-5xl text-vayana-charcoal uppercase font-normal mt-2 leading-tight">
            The Sacred Motifs of Odisha
          </h2>
          <p className="font-editorial-serif text-lg text-vayana-charcoal/70 italic mt-2">
            &ldquo;Ancient symbology and blessings woven into every meter of cloth.&rdquo;
          </p>
          <div className="w-16 h-[1.5px] bg-vayana-gold mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* Motif Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOTIFS.map((motif) => (
            <div
              key={motif.name}
              className="p-8 bg-vayana-parchment border border-vayana-gold/30 flex flex-col items-center text-center hover:border-vayana-maroon transition-all duration-300 reveal-on-scroll"
            >
              <div className="w-16 h-16 rounded-full border border-vayana-gold/60 flex items-center justify-center text-vayana-maroon mb-6 bg-vayana-cream shadow-inner">
                {motif.icon}
              </div>
              <h3 className="font-luxury-display text-xs tracking-widest uppercase text-vayana-charcoal font-semibold">
                {motif.name}
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-vayana-maroon mt-1">{motif.subtitle}</span>
              <p className="text-xs text-vayana-charcoal/75 font-sans leading-relaxed mt-4 font-light">
                {motif.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
