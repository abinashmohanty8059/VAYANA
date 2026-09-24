"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Arrow, SectionLabel } from "@/components/ui/Ornaments";

const TESTIMONIALS = [
  {
    quote:
      "Tradition feels profoundly different when you can wear it. The weight of pure mulberry silk, the crispness of the Bandha motifs, and a certificate signed by Master Rameshwar made this the centrepiece of my wedding.",
    author: "Dr. Arundhati Patnaik",
    location: "London, United Kingdom",
  },
  {
    quote:
      "Vayana is the pinnacle of Indian craft luxury — honouring the weaver while speaking directly to contemporary global aesthetics. The Bomkai drape feels like wearing living temple architecture.",
    author: "Radhika Singhania",
    location: "Mumbai, India",
  },
];

const INTERVAL = 8;

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const busy = useRef(false);
  const progress = useRef<gsap.core.Tween | null>(null);

  // Animate the incoming quote each time the index changes.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const split = SplitText.create(".t-quote", { type: "lines", mask: "lines", linesClass: "split-line" });
      if (!reduce) {
        gsap.from(split.lines, { yPercent: 110, duration: 1.3, stagger: 0.08 });
        gsap.from(".t-meta", { autoAlpha: 0, y: 20, duration: 1, delay: 0.4 });
      }
      progress.current?.kill();
      progress.current = gsap.fromTo(
        ".t-progress",
        { scaleX: 0 },
        { scaleX: 1, duration: INTERVAL, ease: "none", onComplete: () => go(1) }
      );
      return () => split.revert();
    },
    { scope: root, dependencies: [index], revertOnUpdate: true }
  );

  const go = useCallback((dir: number) => {
    if (busy.current) return;
    busy.current = true;
    gsap.to(root.current!.querySelectorAll(".t-quote .split-line, .t-meta"), {
      yPercent: -110,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.04,
      ease: "power3.in",
      onComplete: () => {
        setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
        busy.current = false;
      },
    });
  }, []);

  // Pause autoplay while off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? progress.current?.play() : progress.current?.pause()));
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section ref={root} className="relative bg-bone py-28 md:py-40 overflow-hidden" aria-label="Connoisseur testimonials">
      <span
        className="absolute left-[3vw] top-[6vh] font-display text-[40vw] leading-none text-maroon/[0.07] select-none pointer-events-none"
        data-float="120"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between">
          <SectionLabel index="07">Connoisseur Reflections</SectionLabel>
          <span className="font-display text-xl tabular-nums text-ink/50">
            0{index + 1} <span className="text-ink/25">/ 0{TESTIMONIALS.length}</span>
          </span>
        </div>

        <blockquote key={index} className="mt-16 md:mt-20" aria-live="polite">
          <p className="t-quote font-display text-[7.5vw] md:text-[3.9vw] leading-[1.15] tracking-[-0.015em] text-ink">
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer className="t-meta mt-12 flex items-center gap-5">
            <span className="w-12 h-12 rounded-full bg-maroon text-gold-light font-display text-lg flex items-center justify-center">
              {t.author.replace("Dr. ", "").split(" ").map((w) => w[0]).join("")}
            </span>
            <div>
              <cite className="not-italic eyebrow text-[10px] text-maroon block">{t.author}</cite>
              <span className="text-[13px] text-ink/50">{t.location}</span>
            </div>
            <span className="ml-auto text-gold tracking-[0.3em] text-sm" aria-label="5 star rating">
              ★★★★★
            </span>
          </footer>
        </blockquote>

        <div className="mt-16 flex items-center gap-6">
          <div className="flex-1 h-px bg-ink/15 relative">
            <div className="t-progress absolute inset-0 bg-maroon origin-left scale-x-0" />
          </div>
          <div className="flex gap-3">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => go(d)}
                aria-label={d < 0 ? "Previous testimonial" : "Next testimonial"}
                className="w-14 h-14 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-ivory hover:border-ink transition-colors duration-500"
                data-magnetic="0.4"
              >
                <Arrow className={`w-5 h-5 ${d < 0 ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
