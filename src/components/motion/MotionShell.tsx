"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP, LOADED_EVENT, LITE_QUERY } from "@/lib/gsap";

/**
 * Created first (before any section's ScrollTriggers) so every trigger on the
 * page measures against the smoothed scroller.
 */
function SmootherInit() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.25,
        effects: false,
      });
      return () => smoother.kill();
    });
  });
  return null;
}

const REVEAL_FROM: Record<string, gsap.TweenVars> = {
  up: { y: 80, autoAlpha: 0 },
  fade: { autoAlpha: 0 },
  scale: { scale: 0.88, autoAlpha: 0 },
  left: { x: -90, autoAlpha: 0 },
  right: { x: 90, autoAlpha: 0 },
};

const CLIP_FROM: Record<string, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  center: "inset(45% 45% 45% 45%)",
};

/**
 * Declarative scroll motion. Sections opt in with data attributes:
 *   data-reveal="up|fade|scale|left|right"  data-delay="0.2"
 *   data-stagger                 → children cascade in
 *   data-split="lines|words|chars" → masked SplitText reveal
 *   data-scrub                   → words brighten as you scroll through
 *   data-clip="up|left|center…"  → clip-path wipe, inner <img> de-zooms (data-start overrides trigger)
 *   (parallax, float, spin and skew are skipped on phones/touch — see LITE_QUERY)
 *   data-parallax="0.1"          → yPercent drift relative to its frame
 *   data-float="120"             → px drift over the viewport pass
 *   data-spin="180"              → rotation scrubbed with scroll
 *   data-counter="250"           → count-up number
 *   data-draw                    → SVG strokes draw in
 *   data-skew                    → skews with scroll velocity
 */
export default function MotionShell({
  children,
  chrome,
}: {
  children: React.ReactNode;
  /** Fixed UI (nav, overlays) — kept outside the transformed smooth content. */
  chrome?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", lite: LITE_QUERY }, (ctx) => {
        if (!ctx.conditions!.motion) return;
        // Scroll-scrubbed transforms (parallax, drift, spin, skew) are desktop-only.
        const lite = ctx.conditions!.lite;
        const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, ref.current);

        q("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            ...REVEAL_FROM[el.dataset.reveal || "up"],
            duration: 1.5,
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        q("[data-stagger]").forEach((group) => {
          gsap.from(group.children, {
            y: 70,
            autoAlpha: 0,
            duration: 1.4,
            stagger: Number(group.dataset.stagger) || 0.12,
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          });
        });

        q("[data-split]").forEach((el) => {
          const kind = el.dataset.split || "lines";
          SplitText.create(el, {
            type: kind === "chars" ? "lines,words,chars" : kind === "words" ? "lines,words" : "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              const targets = kind === "chars" ? self.chars : kind === "words" ? self.words : self.lines;
              return gsap.from(targets, {
                yPercent: 118,
                rotate: kind === "chars" ? 8 : 0,
                duration: 1.5,
                stagger: kind === "chars" ? 0.028 : 0.1,
                delay: Number(el.dataset.delay || 0),
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              });
            },
          });
        });

        q("[data-scrub]").forEach((el) => {
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              return gsap.fromTo(
                self.words,
                { opacity: 0.14 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.08,
                  scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true },
                }
              );
            },
          });
        });

        q("[data-clip]").forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: el.dataset.start || "top 88%", once: true } });
          tl.fromTo(
            el,
            { clipPath: CLIP_FROM[el.dataset.clip || "up"] },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut", delay: Number(el.dataset.delay || 0) }
          );
          if (img) tl.from(img, { scale: 1.4, duration: 2.4, ease: "expo.out", clearProps: "transform" }, "<0.1");
        });

        if (!lite) q("[data-parallax]").forEach((el) => {
          const s = parseFloat(el.dataset.parallax || "0.1");
          gsap.fromTo(
            el,
            { yPercent: -s * 100 },
            {
              yPercent: s * 100,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        if (!lite) q("[data-float]").forEach((el) => {
          const d = parseFloat(el.dataset.float || "100");
          gsap.fromTo(
            el,
            { y: d },
            { y: -d, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });

        if (!lite) q("[data-spin]").forEach((el) => {
          gsap.to(el, {
            rotation: parseFloat(el.dataset.spin || "180"),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });

        q("[data-counter]").forEach((el) => {
          const end = parseFloat(el.dataset.counter || "0");
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 2.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toLocaleString("en-IN");
            },
          });
        });

        q<SVGSVGElement>("[data-draw]").forEach((svg) => {
          const shapes = gsap.utils.toArray<SVGGeometryElement>(
            svg.querySelectorAll("path, circle, line, rect, polyline, polygon, ellipse")
          );
          shapes.forEach((s) => {
            const len = s.getTotalLength();
            gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
          });
          gsap.to(shapes, {
            strokeDashoffset: 0,
            duration: 2.2,
            stagger: 0.12,
            ease: "silk",
            scrollTrigger: { trigger: svg, start: "top 88%", once: true },
          });
        });

        const skewTargets = lite ? [] : q("[data-skew]");
        if (skewTargets.length) {
          const proxy = { skew: 0 };
          const set = gsap.quickSetter(skewTargets, "skewY", "deg");
          const clamp = gsap.utils.clamp(-5, 5);
          ScrollTrigger.create({
            onUpdate: (self) => {
              const s = clamp(self.getVelocity() / -400);
              if (Math.abs(s) > Math.abs(proxy.skew)) {
                proxy.skew = s;
                gsap.to(proxy, {
                  skew: 0,
                  duration: 0.9,
                  ease: "power3",
                  overwrite: true,
                  onUpdate: () => set(proxy.skew),
                });
              }
            },
          });
        }
      });
    },
    { scope: ref }
  );

  // Route in-page anchors through the smoother so jumps glide instead of snap.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      const target = id === "#" ? document.body : document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const smoother = ScrollSmoother.get();
      smoother?.paused(false); // the menu pauses scrolling; a link click should always move
      if (smoother) smoother.scrollTo(target === document.body ? 0 : (target as HTMLElement), true, "top 70px");
      else target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener(LOADED_EVENT, refresh);
    window.addEventListener("load", refresh);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(LOADED_EVENT, refresh);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <>
      <SmootherInit />
      {chrome}
      <div id="smooth-wrapper">
        <div id="smooth-content" ref={ref}>
          {children}
        </div>
      </div>
    </>
  );
}
