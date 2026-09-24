"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Two-part cursor: a precise dot plus a lagging ring. The ring swells over
 * interactive elements and turns into a labelled disc over [data-cursor].
 * Also drives [data-magnetic] elements. Disabled on touch / reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add("has-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

    let shown = false;
    let magnet: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.4 });
        shown = true;
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);

      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const strength = Number(magnet.dataset.magnetic) || 0.35;
        gsap.to(magnet, {
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
          duration: 0.6,
          ease: "power3",
        });
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, [role='button'], input, label");
      const m = t.closest<HTMLElement>("[data-magnetic]");

      if (m !== magnet) {
        if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
        magnet = m;
      }

      if (labelled) {
        setLabel(labelled.dataset.cursor || "");
        gsap.to(ring, { width: 96, height: 96, backgroundColor: "rgba(200,162,94,0.92)", borderColor: "transparent", duration: 0.5 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else if (interactive) {
        setLabel("");
        gsap.to(ring, { width: 64, height: 64, backgroundColor: "rgba(200,162,94,0.12)", borderColor: "rgba(200,162,94,0.9)", duration: 0.5 });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      } else {
        setLabel("");
        gsap.to(ring, { width: 36, height: 36, backgroundColor: "rgba(200,162,94,0)", borderColor: "rgba(200,162,94,0.6)", duration: 0.5 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    const onLeave = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
      shown = false;
    };
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.4 });

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[95] w-9 h-9 rounded-full border border-gold/60 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="eyebrow text-[9px] tracking-[0.25em] text-ink">{label}</span>
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[96] w-1.5 h-1.5 rounded-full bg-gold pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
