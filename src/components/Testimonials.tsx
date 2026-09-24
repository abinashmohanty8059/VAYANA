"use client";

import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Tradition feels profoundly different when you can wear it. The weight of the pure mulberry silk, the crispness of the Bandha tie-dye motifs, and the personal certificate signed by Master Rameshwar enclosed in the heirloom case made this the unequivocal centerpiece of my wedding.",
    author: "Dr. Arundhati Patnaik",
    location: "London, United Kingdom",
  },
  {
    quote:
      "Vayana represents the pinnacle of Indian craft luxury — honoring the weaver while speaking directly to contemporary global aesthetics. The Bomkai silk drape feels like wearing a piece of living temple architecture.",
    author: "Radhika Singhania",
    location: "Mumbai, India",
  },
];

export default function Testimonials() {
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
      className="py-20 bg-vayana-parchment border-y border-vayana-gold/30"
      aria-label="Connoisseur testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal-on-scroll">
          <span className="text-[11px] uppercase tracking-mega-luxury text-vayana-gold font-semibold">
            TESTIMONIALS
          </span>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl text-vayana-charcoal uppercase font-normal mt-1">
            Connoisseur Reflections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.author}
              className="p-8 bg-vayana-cream border border-vayana-gold/30 flex flex-col justify-between relative shadow-sm reveal-on-scroll"
            >
              <p className="font-editorial-serif text-lg sm:text-xl text-vayana-charcoal/90 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-vayana-borderMuted flex items-center justify-between">
                <div>
                  <cite className="not-italic font-sans text-xs uppercase tracking-widest font-semibold text-vayana-maroon block">
                    {t.author}
                  </cite>
                  <span className="text-[10px] text-vayana-charcoal/60 tracking-wider">{t.location}</span>
                </div>
                <span className="text-vayana-gold text-sm tracking-widest" aria-label="5 star rating">★★★★★</span>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
