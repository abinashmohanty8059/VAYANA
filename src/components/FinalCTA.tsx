"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Arrow, KumbhaBorder } from "@/components/ui/Ornaments";

export default function FinalCTA() {
  const formRef = useRef<HTMLFormElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    gsap.to(formRef.current, {
      autoAlpha: 0,
      y: -20,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => setSent(true),
    });
  }

  function onMove(e: React.PointerEvent<HTMLElement>) {
    // Moving a 50vw blurred glow is costly; only follow a real mouse.
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(glowRef.current, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 1.4, ease: "power3" });
  }

  return (
    <section
      className="relative bg-maroon text-ivory py-32 md:py-44 overflow-hidden"
      aria-label="Newsletter signup"
      onPointerMove={onMove}
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-gold/25 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 rotate-180">
        <KumbhaBorder className="text-gold/60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 text-center">
        <p className="eyebrow text-gold-light" data-reveal="fade">
          Atelier Privé
        </p>
        <h2 className="mt-8 font-display text-[15vw] md:text-[10vw] leading-[0.85] tracking-[-0.04em] uppercase" data-split="chars">
          Wear your <em className="normal-case text-gold-light">heritage.</em>
        </h2>
        <p className="mt-10 font-display italic text-xl md:text-2xl text-sand/85 max-w-2xl mx-auto" data-reveal="up">
          Private salon drops, bridal previews and heirloom releases — sent only when the loom has something worth saying.
        </p>

        <div className="mt-14 max-w-xl mx-auto min-h-[88px]" data-reveal="up">
          {sent ? (
            <p className="font-display text-3xl text-gold-light" role="status">
              Welcome to the atelier. <em>Your invitation is on its way.</em>
            </p>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="group flex items-center gap-4 border-b border-ivory/40 focus-within:border-gold transition-colors duration-500 pb-3"
              aria-label="Subscribe to the Vayana Atelier newsletter"
            >
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                required
                autoComplete="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent outline-none font-display text-2xl md:text-3xl placeholder:text-ivory/35 py-2"
              />
              <button
                type="submit"
                aria-label="Join the atelier"
                className="shrink-0 w-16 h-16 rounded-full bg-gold text-ink flex items-center justify-center hover:bg-ivory transition-colors duration-500"
                data-magnetic="0.5"
              >
                <Arrow className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
        <p className="mt-6 eyebrow text-[9px] text-ivory/45">Strictly curated · No spam · Unsubscribe anytime</p>
      </div>
    </section>
  );
}
