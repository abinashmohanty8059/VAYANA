"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STEPS = [
  {
    step: "01",
    title: "The Sericulture Thread",
    body: "Ethically gathered mulberry and forest tussar silk cocoons from Mayurbhanj are spun into fine yarns by hand, retaining organic strength and unmatched natural sheen.",
    stage: "Stage: Pure Fiber Sorting",
    image: null,
    highlighted: false,
  },
  {
    step: "02",
    title: "The Bandha (Tie & Dye)",
    body: "Thousands of warp and weft threads are tied with rubber bands and treated with natural organic pigments—madder root, indigo, and myrobalan—calculating design math entirely by eye.",
    stage: "Stage: Precision Resist",
    image: null,
    highlighted: false,
  },
  {
    step: "03",
    title: "The Pit Loom Rhythm",
    body: "Master hands synchronize foot pedals and wooden throw shuttles. Each inch of the Bandha requires hours of microscopic warp adjustment.",
    stage: "Stage: Manual Shuttle Weave",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnDcyT2vnU4s7Zmh3lMAggVZXZ1LJNEv5KWHicnn9gl_H8nBcl2r3jqr51Sq6QubC1-Ppg7vO8hU-BnLoQd0RthpMD0OFyPFYDYMoHdTLKPhnMAEPXXN7DuryuVzY4PEkDN4kS0SE0u3UJM5imuCjgw1ASNxFfE0fk7oz80PjA40qgl0OqyrsmugA-8rxiegZkKWA11wB1mxRAq5AjJ-MlFcdescI8ky8SHYjW-kSZ4dtC1CrZ9YaN",
    highlighted: true,
  },
  {
    step: "04",
    title: "The Heritage Finish",
    body: "Hand-twisting silk tassels, inspecting genuine zari borders under natural light, and applying the Vayana artisan seal certifying pure Odisha handloom origin.",
    stage: "Stage: Authenticity Seal",
    image: null,
    highlighted: false,
  },
];

export default function WeavingSection() {
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
      id="craft"
      className="py-24 bg-vayana-charcoal text-vayana-cream relative overflow-hidden"
      aria-label="Weaving craft chronology"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-[11px] uppercase tracking-mega-luxury text-vayana-gold font-semibold">
            03 / CHRONICLES OF THE LOOM
          </span>
          <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl text-vayana-cream uppercase font-normal mt-2 leading-tight">
            The Art of Weaving.<br />
            <span className="italic font-normal text-vayana-lightGold">Step by Sacred Step.</span>
          </h2>
          <p className="text-sm font-sans text-vayana-sand/70 mt-4 max-w-xl mx-auto font-light">
            The transformation of raw silken threads into an enduring legacy requires months of meditative dedication
            and generations of inherited skill.
          </p>
          <div className="w-16 h-[1.5px] bg-vayana-gold mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              className={`p-6 bg-vayana-deepDark/70 flex flex-col justify-between hover:border-vayana-gold/50 transition-colors reveal-on-scroll ${
                step.highlighted
                  ? "border border-vayana-gold/40 hover:border-vayana-gold relative group"
                  : "border border-vayana-gold/20"
              }`}
            >
              {/* Weaver Image for Step 03 */}
              {step.image && (
                <div className="mb-4 overflow-hidden border border-vayana-gold/30 aspect-video">
                  <Image
                    src={step.image}
                    alt="Hands of an artisan weaver working on wooden pit loom in Odisha"
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div>
                <span className="font-editorial-serif text-4xl text-vayana-gold italic">{step.step}</span>
                <h3 className="font-luxury-display text-sm tracking-widest uppercase text-vayana-cream mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-vayana-sand/70 font-sans leading-relaxed font-light">{step.body}</p>
              </div>
              <div
                className={`mt-6 pt-4 border-t border-vayana-gold/10 text-[10px] uppercase tracking-widest ${
                  step.highlighted ? "text-vayana-lightGold" : "text-vayana-gold"
                }`}
              >
                {step.stage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
