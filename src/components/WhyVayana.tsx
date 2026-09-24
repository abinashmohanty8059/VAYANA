"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Arrow, RotatingSeal, SectionLabel } from "@/components/ui/Ornaments";

const PILLARS = [
  {
    title: "Handwoven with love",
    body: "Zero power-looms. Every millimetre passes through rhythmic pedal movements and an artisan's fingers.",
    tag: "100% handloom",
  },
  {
    title: "Sustainable by nature",
    body: "Non-toxic vegetable dye vats, biodegradable wild tussar silks and a zero-waste textile philosophy.",
    tag: "Botanical dyes",
  },
  {
    title: "Rooted in heritage",
    body: "Direct weaver patronage guaranteeing dignified living wages and a craft that outlives generations.",
    tag: "Fair patronage",
  },
  {
    title: "Made for you",
    body: "Custom pallu inscriptions, bridal consultations and numbered registry papers in every bespoke box.",
    tag: "Bespoke atelier",
  },
];

export default function WhyVayana() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: ".pillars-list",
          start: "top 140px",
          end: () => `bottom ${140 + root.current!.querySelector<HTMLElement>(".pillars-head")!.offsetHeight}px`,
          pin: ".pillars-head",
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="pillars" className="relative bg-wine text-ivory py-28 md:py-40 overflow-hidden" aria-label="Brand pillars">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,162,94,0.18),transparent_60%)]" aria-hidden="true" />
      <div className="ikat-weave absolute inset-0 text-ink/20 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="pillars-head">
            <SectionLabel index="05" className="text-gold">
              The Vayana Commitment
            </SectionLabel>
            <h2 className="mt-8 font-display text-[12vw] md:text-[6vw] lg:text-[4.8vw] leading-[0.95] tracking-[-0.03em]" data-split="lines">
              Sacred trust &amp; <em className="text-gold-light">craft integrity.</em>
            </h2>
            <div className="mt-12 hidden lg:block" data-reveal="scale">
              <RotatingSeal text="GI TAGGED · CERTIFIED HANDLOOM · ODISHA · " className="w-36 h-36" ringClass="text-gold-light">
                <span className="font-display text-2xl text-gold">GI</span>
              </RotatingSeal>
            </div>
          </div>
        </div>

        <ol className="pillars-list lg:col-span-7 border-t border-ivory/15">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="group relative border-b border-ivory/15 overflow-hidden" data-reveal="up">
              <div className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-[900ms] ease-luxe" />
              <div className="relative py-10 md:py-14 px-2 md:px-6 grid grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start transition-colors duration-700 group-hover:text-ink">
                <span className="font-display italic text-xl text-gold group-hover:text-maroon transition-colors duration-700">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl leading-tight transition-transform duration-700 ease-luxe group-hover:translate-x-3">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[15px] leading-[1.8] text-sand/70 group-hover:text-ink/75 transition-colors duration-700">
                    {p.body}
                  </p>
                  <span className="mt-6 inline-block eyebrow text-[9px] px-3 py-1.5 rounded-full border border-current/30">{p.tag}</span>
                </div>
                <Arrow className="w-6 h-6 mt-3 -rotate-45 opacity-40 transition-all duration-700 ease-luxe group-hover:rotate-0 group-hover:opacity-100" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
