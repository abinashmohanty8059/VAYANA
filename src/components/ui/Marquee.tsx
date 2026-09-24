"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface MarqueeProps {
  items: React.ReactNode[];
  /** Seconds for one full loop at rest. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
}

/**
 * Infinite ticker that follows scroll: it speeds up with scroll velocity and
 * flips direction when the reader scrolls back up.
 */
export default function Marquee({
  items,
  duration = 40,
  reverse = false,
  className = "",
  itemClassName = "",
  separator = <span className="text-gold mx-[0.6em]">✦</span>,
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const base = reverse ? -1 : 1;
      const tween = gsap.fromTo(
        track.current,
        { xPercent: 0 },
        { xPercent: -50, ease: "none", duration, repeat: -1 }
      );
      // Park the playhead deep in the repeat so negative timeScale can run backwards indefinitely.
      tween.totalTime(duration * 500);
      tween.timeScale(base);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        tween.pause();
        return;
      }

      let dir = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          dir = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
          gsap.to(tween, { timeScale: base * dir * boost, duration: 0.25, overwrite: true });
          gsap.to(tween, { timeScale: base * dir, duration: 1.2, delay: 0.25 });
        },
      });
    },
    { scope: root }
  );

  const row = (
    <div className="flex shrink-0 items-center">
      {/* doubled so each half comfortably exceeds the viewport width */}
      {[...items, ...items].map((item, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          {item}
          {separator}
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`overflow-hidden select-none ${className}`}>
      <div ref={track} className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
