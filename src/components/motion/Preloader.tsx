"use client";

import { useRef } from "react";
import { gsap, useGSAP, LOADED_EVENT } from "@/lib/gsap";

const WORD = "VAYANA";

function finish() {
  // Deferred so listeners run outside this timeline's GSAP context (which would
  // otherwise scope their selector strings to the preloader).
  requestAnimationFrame(() => {
    const root = document.documentElement;
    root.classList.remove("is-loading");
    root.dataset.loaded = "1";
    window.dispatchEvent(new Event(LOADED_EVENT));
  });
}

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.to(ref.current, { autoAlpha: 0, duration: 0.3, onComplete: finish });
        return;
      }

      const counter = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "luxe" } });

      tl.from(".pl-char", { yPercent: 120, duration: 1.3, stagger: 0.07 })
        .from(".pl-rule", { scaleX: 0, duration: 1.6, ease: "silk" }, 0.2)
        .from(".pl-meta", { autoAlpha: 0, y: 12, duration: 0.8, stagger: 0.1 }, 0.4)
        .to(
          counter,
          {
            v: 100,
            duration: 1.9,
            ease: "silk",
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.1
        )
        .to(".pl-char", { yPercent: -120, duration: 0.9, stagger: 0.04, ease: "power3.in" }, "+=0.15")
        .to(".pl-meta, .pl-rule", { autoAlpha: 0, duration: 0.4 }, "<")
        .to(".pl-panel-front", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.3")
        .to(".pl-panel-back", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.95")
        .add(finish, "-=0.75")
        .set(ref.current, { display: "none" });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      <div className="pl-panel-back absolute inset-0 bg-maroon" />
      <div className="pl-panel-front absolute inset-0 bg-ink flex flex-col items-center justify-center text-ivory">
        <div className="ikat-weave absolute inset-0 text-gold/[0.04]" />

        <div className="pl-meta absolute top-8 left-6 md:left-12 eyebrow text-gold/80">Odisha · Est. 1948</div>
        <div className="pl-meta absolute top-8 right-6 md:right-12 eyebrow text-gold/80">Handloom Atelier</div>

        <div className="overflow-hidden">
          <h2 className="font-display text-[18vw] md:text-[11vw] leading-[0.85] tracking-[-0.02em] flex">
            {WORD.split("").map((c, i) => (
              <span key={i} className="pl-char inline-block">
                {c}
              </span>
            ))}
          </h2>
        </div>
        <div className="pl-rule mt-6 h-px w-40 md:w-64 bg-gold origin-left" />
        <p className="pl-meta mt-5 font-display italic text-lg md:text-xl text-sand/80">Wear your heritage</p>

        <div className="pl-meta absolute bottom-8 left-6 md:left-12 eyebrow text-sand/60">Weaving the loom</div>
        <div className="pl-meta absolute bottom-6 right-6 md:right-12 font-display text-5xl md:text-7xl text-gold tabular-nums">
          <span ref={countRef}>000</span>
        </div>
      </div>
    </div>
  );
}
