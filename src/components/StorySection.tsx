"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function StorySection() {
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
      id="story"
      className="py-24 bg-vayana-cream"
      aria-label="Founders note"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Editorial Montage */}
          <div className="lg:col-span-5 reveal-on-scroll">
            <div className="relative">
              {/* Weaver Hands Main Card */}
              <div className="border border-vayana-gold/50 shadow-2xl overflow-hidden bg-vayana-parchment">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnDcyT2vnU4s7Zmh3lMAggVZXZ1LJNEv5KWHicnn9gl_H8nBcl2r3jqr51Sq6QubC1-Ppg7vO8hU-BnLoQd0RthpMD0OFyPFYDYMoHdTLKPhnMAEPXXN7DuryuVzY4PEkDN4kS0SE0u3UJM5imuCjgw1ASNxFfE0fk7oz80PjA40qgl0OqyrsmugA-8rxiegZkKWA11wB1mxRAq5AjJ-MlFcdescI8ky8SHYjW-kSZ4dtC1CrZ9YaN"
                  alt="Weaver hands on traditional pit loom"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Brand Emblem Plaque */}
              <div className="absolute -bottom-8 -right-6 w-40 h-40 bg-vayana-cream border-2 border-vayana-gold p-3 shadow-xl hidden sm:flex flex-col items-center justify-center text-center">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBShTKmrjaiVTMmdyKa1qdMtJlhSddhsnwXj0Sz8ZJeX5c9kPHhPnxWO8ckTdQ_9NflzVLHwfIa8fE4lR92OP10rxelVha1wmGz8Lavp-ITmiZAeBBGTIv3sgz9b9SiBNw8s9Q6PxOahgnkPwLZLSMJ7s-OSMZUy8a6KgdRRJcmB_eK7jTHKt1YB2GTEoMXUVNKYlCBzQwJOiWYyMkLpO7FA0X_RBrvqp7gcDx96dxKpTCllftW8_t3LbNgBS-HQcCDag"
                  alt="Vayana Authentic Handloom Emblem"
                  width={64}
                  height={64}
                  className="h-16 w-auto object-contain mb-1"
                />
                <span className="text-[8px] uppercase tracking-widest text-vayana-maroon font-bold">
                  AUTHENTIC HANDLOOM
                </span>
              </div>
            </div>
          </div>

          {/* Right: Founders' Letter */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 reveal-on-scroll">
            <span className="text-[11px] uppercase tracking-widest-luxury text-vayana-maroon font-semibold">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-5xl text-vayana-charcoal uppercase font-normal leading-tight">
              A Heritage, Rewoven.
            </h2>
            <div className="w-12 h-[1px] bg-vayana-gold" aria-hidden="true" />
            <p className="font-editorial-serif text-lg text-vayana-charcoal/90 italic leading-relaxed">
              Dear Connoisseur,
            </p>
            <p className="text-sm font-sans text-vayana-charcoal/80 leading-relaxed font-light">
              Vayana was born out of profound reverence for the handloom treasures of Western and Coastal Odisha.
              Growing up surrounded by the hypnotic clatter of pit looms in Bargarh, Nuapatna, and Sonepur, we
              witnessed textiles that weren&rsquo;t merely clothing, but sacred tapestries that took months to manifest.
            </p>
            <p className="text-sm font-sans text-vayana-charcoal/80 leading-relaxed font-light">
              As commercial fast fashion accelerated, these centuries-old Bandha equations faced quiet extinction. We
              established Vayana Textiles to build an uncompromised luxury bridge: returning pride, dignity, and global
              patronages directly to our master weavers while offering the discerning world silhouettes of timeless,
              regal sophistication.
            </p>

            {/* Signature Block */}
            <div className="pt-6 border-t border-vayana-borderMuted">
              <p className="font-editorial-serif text-2xl text-vayana-maroon italic">With heartfelt thanks,</p>
              <span className="font-luxury-display text-sm tracking-widest uppercase text-vayana-charcoal font-bold mt-1 block">
                TEAM VAYANA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-vayana-gold font-medium mt-0.5 block">
                Bhubaneswar &amp; Sambalpur, Odisha
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
