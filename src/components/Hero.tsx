"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, onSiteLoaded, LITE_QUERY } from "@/lib/gsap";
import { Arrow, LotusMark, RotatingSeal } from "@/components/ui/Ornaments";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-volyhwMaESvlSKJXljofrPBT4fAllPOkDtMR_W_IIjlwa9Yu2sOAcyQqSv0JjP6fSR9rJr5RSvZNo247LKwzLyJep5L2ANaJKn5gqZQm_wOdSFTs6uyuLcmBX0U0WLv1h0ZrlM4eVep1GIEDpt-0r23sHYU1V-D6hmMMBDECzRo22G1rr2bisu3QDO5NP-U2qT0xzYfErvx-LVkgrAdpFk_4RowYFzoDjz6Vkk1OOXPN1u1lpdf0";
const CARD_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB9GWQUIpIrs81E8-MKzUPQ43j0v--X7JJiP-WBI3eKE1Z7llgvf3CN2_6icP8YnoWAFPwu0bt6C5hN8u7o4itZvIq8Sjv75uFVy12jiFVCQ5Ybljll1Try_OaD7OmdY6OF-j3-5-CCq4BWiQkivN2nmWPJSnPzGSl6ZzNDQhS0pypF85_w0CpuDbHaZddPSIVpkbyjl4iiLamYBpguVZzwo2od80p7ISwKVhOSypJX-osOQlGpCo4O";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const split = SplitText.create(".hero-title-line", { type: "chars", mask: "chars" });

      // Hidden until the preloader curtain lifts.
      gsap.set(split.chars, { yPercent: 115 });
      gsap.set(".hero-main-frame", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(".hero-main-img", { scale: 1.35 });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 30 });
      gsap.set(".hero-card", { autoAlpha: 0, y: 120, rotate: -6 });
      gsap.set(".hero-rule", { scaleX: 0 });

      const intro = contextSafe!(() =>
        gsap
          .timeline({ defaults: { ease: "luxe" } })
          .to(".hero-main-frame", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }, 0)
          .to(".hero-main-img", { scale: 1, duration: 2.6, ease: "expo.out" }, 0.2)
          .to(split.chars, { yPercent: 0, duration: 1.6, stagger: 0.035 }, 0.35)
          .to(".hero-rule", { scaleX: 1, duration: 1.6, ease: "silk" }, 0.8)
          .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 1)
          .to(".hero-card", { autoAlpha: 1, y: 0, rotate: -3, duration: 1.8 }, 1.1)
      );
      const off = onSiteLoaded(intro);

      // Scroll-out: headline lifts, photograph pushes in, everything dims. Desktop only —
      // scrubbing a full-screen photo's scale is too heavy for phones.
      if (!window.matchMedia(LITE_QUERY).matches) gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          defaults: { ease: "none" },
        })
        .to(".hero-title", { yPercent: -35 }, 0)
        .to(".hero-main-img", { scale: 1.18, yPercent: 8 }, 0)
        .to(".hero-card", { yPercent: -80 }, 0)
        .to(".hero-seal", { rotate: 200, yPercent: -60 }, 0)
        .to(".hero-dim", { opacity: 0.75 }, 0);

      // Mouse depth parallax.
      if (window.matchMedia("(pointer: fine)").matches) {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]");
        const setters = layers.map((el) => ({
          d: Number(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach(({ d, x, y }) => {
            x(nx * d);
            y(ny * d);
          });
        };
        root.current!.addEventListener("pointermove", onMove);
        return () => {
          off();
          root.current?.removeEventListener("pointermove", onMove);
        };
      }
      return off;
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] bg-ink text-ivory overflow-hidden"
      aria-label="Hero campaign"
    >
      {/* Hairline column grid + ikat weave */}
      <div className="hairline-grid absolute inset-0 text-ivory/[0.045] pointer-events-none" aria-hidden="true" />
      <div className="ikat-weave absolute inset-0 text-gold/[0.03] pointer-events-none" aria-hidden="true" />

      {/* Main photograph */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[52%]" data-depth="-14">
        <div className="hero-main-frame absolute inset-0 overflow-hidden">
          <div className="hero-main-img absolute inset-0 origin-top">
            <Image
              src={HERO_IMG}
              alt="Model draped in a crimson and gold Sambalpuri silk saree"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-top"
              preload
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent md:via-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
          <div className="hero-dim absolute inset-0 bg-ink opacity-0" />
        </div>
      </div>

      {/* Radial glow */}
      <div
        className="absolute -left-40 top-1/3 w-[60vw] h-[60vw] rounded-full bg-maroon/25 blur-[140px] pointer-events-none"
        data-depth="30"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-10 min-h-[100svh] flex flex-col pt-28 pb-10">
        {/* Top meta row */}
        <div className="flex items-start justify-between">
          <p className="hero-fade eyebrow text-gold">Autumn / Winter Atelier · MMXXV</p>
          <p className="hero-fade eyebrow text-sand/60 hidden md:block text-right">
            20.2961° N
            <br />
            85.8245° E
          </p>
        </div>

        {/* Headline */}
        <h1 className="hero-title mt-auto font-display leading-[0.82] tracking-[-0.035em] uppercase">
          <span className="hero-title-line block text-[15vw] md:text-[13.5vw] lg:text-[12vw]">Wear</span>
          <span className="hero-title-line block text-[15vw] md:text-[13.5vw] lg:text-[12vw] pl-[8vw] italic normal-case text-gold leading-[1]">
            your
          </span>
          <span className="hero-title-line block text-[15vw] md:text-[13.5vw] lg:text-[12vw]">Heritage</span>
        </h1>

        <div className="hero-rule mt-8 h-px w-full bg-gradient-to-r from-gold via-gold/40 to-transparent origin-left" />

        {/* Bottom row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <p className="hero-fade md:col-span-5 font-display text-lg md:text-xl text-sand/85 leading-relaxed max-w-md">
            Rare Sambalpuri Bandha &amp; Bomkai silks, hand-tied thread by thread and woven on centuries-old pit looms in
            the heartlands of Odisha.
          </p>

          <div className="hero-fade md:col-span-4 flex flex-wrap items-center gap-5">
            <a href="#collection" className="btn-lux bg-ivory text-ink hover:text-ink" data-magnetic="0.25">
              Explore the collection <Arrow className="btn-arrow w-4 h-4" />
            </a>
            <a href="#story" className="link-slide eyebrow text-[10px] text-ivory/80">
              Our sacred story
            </a>
          </div>

          <div className="hero-fade md:col-span-3 flex md:justify-end items-center gap-4">
            <span className="block w-px h-14 bg-ivory/20 relative overflow-hidden">
              <span className="absolute inset-0 bg-gold animate-scroll-cue" />
            </span>
            <span className="eyebrow text-[9px] text-sand/60">Scroll to unfold</span>
          </div>
        </div>
      </div>

      {/* Floating detail card */}
      <div className="hidden lg:block absolute z-20 left-[38%] top-[22%] w-[190px] xl:w-[220px]" data-depth="36">
        <a href="#collection" className="hero-card block" data-cursor="View">
          <div className="relative aspect-[3/4] overflow-hidden border border-gold/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
            <Image src={CARD_IMG} alt="Bomkai heirloom silk detail" fill sizes="220px" className="object-cover" />
          </div>
          <div className="mt-3 flex items-center justify-between eyebrow text-[9px] text-sand/70">
            <span>Bomkai Heirloom</span>
            <span className="text-gold">Nº 07</span>
          </div>
        </a>
      </div>

      {/* Seal */}
      <div className="absolute z-20 right-5 md:right-10 top-1/2 -translate-y-1/2 hidden md:block" data-depth="-24">
        <a href="#collection" className="hero-seal hero-fade block" aria-label="Explore the collection">
          <RotatingSeal className="w-28 h-28 lg:w-36 lg:h-36">
            <LotusMark className="w-10 h-10 text-gold" />
          </RotatingSeal>
        </a>
      </div>
    </section>
  );
}
