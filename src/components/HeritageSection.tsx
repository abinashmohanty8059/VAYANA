"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeritageSection() {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="roots"
      className="py-20 md:py-28 bg-vayana-parchment relative"
      aria-label="Heritage storytelling"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-[11px] uppercase tracking-mega-luxury text-vayana-gold font-semibold">
            01 / ROOTS &amp; REVERENCE
          </span>
          <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl text-vayana-charcoal font-normal mt-2 leading-tight uppercase">
            Rooted in Heritage.<br />
            <span className="italic font-normal text-vayana-maroon">Crafted for Today.</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-vayana-gold mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Visual Narrative Frame */}
          <div className="lg:col-span-6 reveal-on-scroll">
            <div className="relative group">
              <div className="overflow-hidden border border-vayana-gold/50 shadow-xl bg-vayana-sand">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC4E8uceW9-3fAzWIds4SCn-1TTzTCZQ-swWs6OSgbxQ8b_eLLVcz5q60YVzZxGMVFRtfFnDXQlHGtYa5UPgk9B6tKns2QSkvPc6VP3s4oxNX85jbDsJmSCZ6aRAkeqbuFs3B3L3CQWRKu_cbbvV65QQmbjJOBmyr9iaiQUE8DCJ2pWOxOAR-g7I0ewdTwgchav5x71tOF3q4Q4j5Vw3Yt3kKYYG9JA7O4wSCH-Jmc1gtqqRlFnDic"
                  alt="Cinematic luxury fashion campaign of Indian woman in Kalinga temple courtyard"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              {/* Caption Card Plaque */}
              <div className="mt-4 p-5 bg-vayana-cream border-l-2 border-vayana-maroon shadow-sm">
                <p className="text-xs font-serif uppercase tracking-widest text-vayana-maroon font-semibold">
                  THE SANCTUARY OF KONARK &amp; NUAPATNA
                </p>
                <p className="text-xs text-vayana-charcoal/70 font-sans mt-1 leading-relaxed">
                  Echoing the carved sandstone spires of 13th-century Kalinga temples, our master weavers channel
                  geometry, rhythm, and devotion into the loom.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Poetic Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 reveal-on-scroll">
            <h3 className="font-editorial-serif text-2xl sm:text-3xl text-vayana-charcoal leading-snug">
              &ldquo;We do not manufacture textiles; we preserve living poetry passed down through seven generations of
              master weavers.&rdquo;
            </h3>
            <p className="text-sm font-sans text-vayana-charcoal/80 leading-relaxed font-light">
              In the ancient river valleys of Odisha, textile making is not merely a profession—it is a spiritual
              communion. The legendary <em>Bandhakala</em> (Ikat) process requires mathematical brilliance: threads are
              dyed prior to weaving with millimeter accuracy so that when the wooden shuttle passes through the warp,
              complex sacred geometries emerge effortlessly.
            </p>
            <p className="text-sm font-sans text-vayana-charcoal/80 leading-relaxed font-light">
              Vayana honors this legacy by ensuring 100% direct artisan compensation, sustainable wild mulberry and
              tussar sericulture, and zero chemical run-off into our sacred waterways.
            </p>

            {/* Stats Matrix */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-vayana-gold/30">
              {[
                { value: "GI-Tag", label: "Odisha Authenticity" },
                { value: "250+", label: "Artisan Guilds" },
                { value: "45 Days", label: "Loom Precision Per Saree" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <span className="block font-editorial-serif text-2xl text-vayana-maroon">{value}</span>
                  <span className="text-[10px] uppercase tracking-wider text-vayana-charcoal/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
