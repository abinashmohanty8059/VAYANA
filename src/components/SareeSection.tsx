"use client";

import { useRef, useState } from "react";
import SareeCloth from "@/components/saree/SareeCloth";
import { SAREE_DESIGNS } from "@/components/saree/sareeTexture";
import { Arrow } from "@/components/ui/Ornaments";
import { gsap, useGSAP } from "@/lib/gsap";

const COUNT = SAREE_DESIGNS.length;
const pad = (n: number) => String(n).padStart(2, "0");

export default function SareeSection() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const dir = useRef(1);
  const design = SAREE_DESIGNS[index];

  // Slide the caption in from the direction of travel each time the design changes.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".saree-caption > *", {
        xPercent: 12 * dir.current,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.06,
      });
    },
    { scope: root, dependencies: [index], revertOnUpdate: true }
  );

  function go(step: number) {
    dir.current = step >= 0 ? 1 : -1;
    setIndex((i) => (i + step + COUNT) % COUNT);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  }

  return (
    <section
      ref={root}
      id="drape"
      className="relative h-[100svh] min-h-[680px] bg-ink text-ivory overflow-hidden"
      aria-label="Saree gallery"
      aria-roledescription="carousel"
      onKeyDown={onKey}
    >
      {/* Glow behind the silk, tinted by the current saree */}
      <div
        className="absolute inset-0 transition-[background] duration-1000"
        style={{ background: `radial-gradient(60% 55% at 55% 50%, ${design.body[0]}73, transparent 70%)` }}
        aria-hidden="true"
      />
      <div className="ikat-weave absolute inset-0 text-gold/[0.03] pointer-events-none" aria-hidden="true" />

      <div className="absolute inset-0" data-cursor="Stir">
        <SareeCloth className="absolute inset-0" design={design} />
      </div>

      {/* Edge fades into the neighbouring sections */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink via-ink/70 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 h-full max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-28 flex flex-col justify-between pointer-events-none">
        {/* Heading + counter */}
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 eyebrow text-gold" data-reveal="left">
              <span className="h-px w-10 bg-current opacity-60" />
              <span>Off the loom</span>
            </div>
            <h2 className="mt-6 font-display text-[12vw] md:text-[6vw] leading-[0.92] tracking-[-0.03em]" data-split="lines">
              The drape, <em className="text-gold-light">set free.</em>
            </h2>
          </div>
          <p className="hidden md:block font-display text-2xl tabular-nums text-gold pt-2" aria-hidden="true">
            {pad(index + 1)}
            <span className="text-ivory/30"> / {pad(COUNT)}</span>
          </p>
        </div>

        {/* Caption + controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="saree-caption max-w-md" aria-live="polite">
            <p className="eyebrow text-gold">
              {design.weave} · {design.origin}
            </p>
            <h3 className="mt-3 font-display text-4xl md:text-5xl leading-none">{design.name}</h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-sand/70">{design.note}</p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 pointer-events-auto">
            <div className="flex items-center gap-3 md:gap-4 p-1.5 rounded-full bg-ink/55 backdrop-blur-md ring-1 ring-ivory/10">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous saree"
                className="w-14 h-14 rounded-full border border-ivory/30 flex items-center justify-center hover:bg-ivory hover:text-ink hover:border-ivory transition-colors duration-500"
                data-magnetic="0.4"
              >
                <Arrow className="w-5 h-5 rotate-180" />
              </button>
              <div className="flex items-center gap-2" role="tablist" aria-label="Choose a saree">
                {SAREE_DESIGNS.map((d, i) => (
                  <button
                    key={d.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={d.name}
                    onClick={() => {
                      dir.current = i >= index ? 1 : -1;
                      setIndex(i);
                    }}
                    className="group p-1.5"
                  >
                    <span
                      className={`block h-2.5 rounded-full ring-1 ring-ivory/30 transition-all duration-700 ease-luxe ${
                        i === index ? "w-8" : "w-2.5 group-hover:ring-gold"
                      }`}
                      style={{ backgroundColor: d.body[0] }}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next saree"
                className="w-14 h-14 rounded-full bg-gold text-ink flex items-center justify-center hover:bg-ivory transition-colors duration-500"
                data-magnetic="0.4"
              >
                <Arrow className="w-5 h-5" />
              </button>
            </div>
            <a
              href="#collection"
              className="btn-lux border border-ivory/40 text-ivory hover:text-ink [--btn-fill:var(--color-gold)]"
              data-magnetic="0.25"
            >
              Find your drape <Arrow className="btn-arrow w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
