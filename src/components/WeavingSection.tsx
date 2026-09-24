"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/Ornaments";

const STEPS = [
  {
    step: "01",
    title: "The Sericulture Thread",
    body: "Ethically gathered mulberry and forest tussar cocoons from Mayurbhanj are spun into fine yarn by hand, keeping their organic strength and unmatched natural sheen.",
    stage: "Pure fibre sorting",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC4E8uceW9-3fAzWIds4SCn-1TTzTCZQ-swWs6OSgbxQ8b_eLLVcz5q60YVzZxGMVFRtfFnDXQlHGtYa5UPgk9B6tKns2QSkvPc6VP3s4oxNX85jbDsJmSCZ6aRAkeqbuFs3B3L3CQWRKu_cbbvV65QQmbjJOBmyr9iaiQUE8DCJ2pWOxOAR-g7I0ewdTwgchav5x71tOF3q4Q4j5Vw3Yt3kKYYG9JA7O4wSCH-Jmc1gtqqRlFnDic",
  },
  {
    step: "02",
    title: "The Bandha — Tie & Dye",
    body: "Thousands of warp and weft threads are tied and dipped in madder root, indigo and myrobalan — the design mathematics calculated entirely by eye.",
    stage: "Precision resist",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9GWQUIpIrs81E8-MKzUPQ43j0v--X7JJiP-WBI3eKE1Z7llgvf3CN2_6icP8YnoWAFPwu0bt6C5hN8u7o4itZvIq8Sjv75uFVy12jiFVCQ5Ybljll1Try_OaD7OmdY6OF-j3-5-CCq4BWiQkivN2nmWPJSnPzGSl6ZzNDQhS0pypF85_w0CpuDbHaZddPSIVpkbyjl4iiLamYBpguVZzwo2od80p7ISwKVhOSypJX-osOQlGpCo4O",
  },
  {
    step: "03",
    title: "The Pit Loom Rhythm",
    body: "Master hands synchronise foot pedals and wooden throw-shuttles. Every inch of Bandha demands hours of microscopic warp adjustment.",
    stage: "Manual shuttle weave",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnDcyT2vnU4s7Zmh3lMAggVZXZ1LJNEv5KWHicnn9gl_H8nBcl2r3jqr51Sq6QubC1-Ppg7vO8hU-BnLoQd0RthpMD0OFyPFYDYMoHdTLKPhnMAEPXXN7DuryuVzY4PEkDN4kS0SE0u3UJM5imuCjgw1ASNxFfE0fk7oz80PjA40qgl0OqyrsmugA-8rxiegZkKWA11wB1mxRAq5AjJ-MlFcdescI8ky8SHYjW-kSZ4dtC1CrZ9YaN",
  },
  {
    step: "04",
    title: "The Heritage Finish",
    body: "Silk tassels twisted by hand, zari borders inspected in natural light, and the Vayana seal applied to certify pure Odisha handloom origin.",
    stage: "Authenticity seal",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-volyhwMaESvlSKJXljofrPBT4fAllPOkDtMR_W_IIjlwa9Yu2sOAcyQqSv0JjP6fSR9rJr5RSvZNo247LKwzLyJep5L2ANaJKn5gqZQm_wOdSFTs6uyuLcmBX0U0WLv1h0ZrlM4eVep1GIEDpt-0r23sHYU1V-D6hmMMBDECzRo22G1rr2bisu3QDO5NP-U2qT0xzYfErvx-LVkgrAdpFk_4RowYFzoDjz6Vkk1OOXPN1u1lpdf0",
  },
];

export default function WeavingSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const panels = gsap.utils.toArray<HTMLElement>(".weave-panel");

        const scroll = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: () => {
              // Current step = last panel whose left edge has crossed mid-screen.
              const mid = window.innerWidth / 2;
              const i = panels.filter((p) => p.getBoundingClientRect().left < mid).length;
              if (counter.current) counter.current.textContent = `0${Math.max(1, i)}`;
            },
          },
        });

        gsap.to(".weave-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        panels.forEach((panel) => {
          const st = { containerAnimation: scroll, trigger: panel, scrub: true };
          gsap.fromTo(
            panel.querySelector(".weave-img"),
            { xPercent: -12 },
            { xPercent: 12, ease: "none", scrollTrigger: { ...st, start: "left right", end: "right left" } }
          );
          gsap.from(panel.querySelector(".weave-frame"), {
            clipPath: "inset(0% 100% 0% 0%)",
            ease: "none",
            scrollTrigger: { ...st, start: "left 95%", end: "left 45%" },
          });
          gsap.from(panel.querySelectorAll(".weave-text > *"), {
            y: 60,
            autoAlpha: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { ...st, start: "left 80%", end: "left 40%" },
          });
          gsap.fromTo(
            panel.querySelector(".weave-num"),
            { xPercent: 30 },
            { xPercent: -30, ease: "none", scrollTrigger: { ...st, start: "left right", end: "right left" } }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="craft"
      className="relative bg-ink text-ivory overflow-hidden lg:h-screen"
      aria-label="Weaving craft chronology"
    >
      <div className="ikat-weave absolute inset-0 text-gold/[0.025] pointer-events-none" aria-hidden="true" />

      {/* HUD */}
      <div className="hidden lg:flex absolute z-20 inset-x-0 bottom-0 px-10 pb-8 items-center gap-8">
        <span className="font-display text-2xl text-gold tabular-nums">
          <span ref={counter}>01</span>
          <span className="text-ivory/30"> / 0{STEPS.length}</span>
        </span>
        <div className="flex-1 h-px bg-ivory/15 relative">
          <div className="weave-progress absolute inset-0 bg-gold origin-left scale-x-0" />
        </div>
        <span className="eyebrow text-[9px] text-sand/50">Keep scrolling</span>
      </div>

      <div ref={track} className="relative flex flex-col lg:flex-row lg:h-full lg:w-max">
        {/* Intro panel */}
        <div className="shrink-0 lg:w-[50vw] px-5 md:px-10 pt-28 pb-16 lg:py-0 flex flex-col justify-center">
          <SectionLabel index="03" className="text-gold">
            Chronicles of the Loom
          </SectionLabel>
          <h2 className="mt-8 font-display text-[13vw] lg:text-[6.2vw] leading-[0.9] tracking-[-0.03em]">
            The art <br />
            of weaving<span className="text-gold">.</span>
            <br />
            <em className="text-gold-light">Step by sacred step.</em>
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-[1.8] text-sand/65">
            Raw silken thread becomes an enduring legacy only through months of meditative dedication and generations of
            inherited skill.
          </p>
        </div>

        {STEPS.map((s) => (
          <article
            key={s.step}
            className="weave-panel relative shrink-0 lg:w-[72vw] xl:w-[64vw] lg:h-full px-5 md:px-10 lg:pl-0 lg:pr-[6vw] py-14 lg:py-0 flex flex-col lg:flex-row lg:items-center gap-10 border-t border-ivory/10 lg:border-t-0"
          >
            <span
              className="weave-num absolute right-[4vw] top-6 lg:top-[8vh] font-display italic text-outline text-[28vw] lg:text-[22vw] leading-none text-gold/25 pointer-events-none select-none"
              aria-hidden="true"
            >
              {s.step}
            </span>

            <div className="weave-frame relative w-full lg:w-[46%] aspect-[4/5] lg:aspect-auto lg:h-[64vh] overflow-hidden shrink-0">
              <div className="weave-img absolute inset-y-0 -inset-x-[14%]">
                <Image src={s.image} alt="" fill sizes="(max-width: 1024px) 100vw, 35vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/30" />
            </div>

            <div className="weave-text relative lg:w-[44%]">
              <p className="eyebrow text-gold">Stage {s.step}</p>
              <h3 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">{s.title}</h3>
              <div className="mt-6 h-px w-16 bg-gold" />
              <p className="mt-6 text-[15px] leading-[1.85] text-sand/70 max-w-md">{s.body}</p>
              <p className="mt-8 eyebrow text-[9.5px] text-gold-light/80">— {s.stage}</p>
            </div>
          </article>
        ))}
        <div className="hidden lg:block shrink-0 w-[8vw]" aria-hidden="true" />
      </div>
    </section>
  );
}
