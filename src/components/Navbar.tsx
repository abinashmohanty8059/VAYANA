"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollSmoother, useGSAP, onSiteLoaded } from "@/lib/gsap";
import { LotusMark, RollText } from "@/components/ui/Ornaments";

const NAV_LINKS = [
  { href: "#roots", label: "Heritage" },
  { href: "#collection", label: "Collection" },
  { href: "#craft", label: "The Craft" },
  { href: "#motifs", label: "Motifs" },
  { href: "#story", label: "Our Story" },
];

export const CART_EVENT = "vayana:cart";

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLSpanElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useGSAP(() => {
    const header = headerRef.current!;
    gsap.set(header, { yPercent: -100 });
    const cleanup = onSiteLoaded(() => gsap.to(header, { yPercent: 0, duration: 1.4, delay: 0.5 }));

    const show = gsap.quickTo(header, "yPercent", { duration: 0.7, ease: "power3" });
    let hidden = false;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setSolid(y > window.innerHeight * 0.75);
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
        const shouldHide = self.direction === 1 && y > 600;
        if (shouldHide !== hidden) {
          hidden = shouldHide;
          show(hidden ? -100 : 0);
        }
      },
    });

    // Full-screen menu: circular reveal from the toggle, then staggered links.
    menuTl.current = gsap
      .timeline({ paused: true })
      .set(menuRef.current, { display: "flex" })
      .fromTo(
        menuRef.current,
        { clipPath: "circle(0% at calc(100% - 44px) 44px)" },
        { clipPath: "circle(150% at calc(100% - 44px) 44px)", duration: 1.1, ease: "expo.inOut" }
      )
      .from(".menu-link", { yPercent: 120, duration: 1, stagger: 0.07 }, "-=0.5")
      .from(".menu-meta", { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.08 }, "-=0.7");

    return cleanup;
  });

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    ScrollSmoother.get()?.paused(open);
    if (open) gsap.to(headerRef.current, { yPercent: 0, duration: 0.5, overwrite: "auto" });
    if (open) tl.timeScale(1).play();
    else tl.timeScale(1.6).reverse();
  }, [open]);

  useEffect(() => {
    const onCart = () => {
      setCartCount((c) => c + 1);
      gsap.fromTo(cartRef.current, { scale: 1.8 }, { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    };
    window.addEventListener(CART_EVENT, onCart);
    return () => window.removeEventListener(CART_EVENT, onCart);
  }, []);

  const tone = solid || open ? "text-ink" : "text-ivory";

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50" id="main-navigation">
        <div
          className={`absolute inset-0 transition-all duration-700 ease-luxe ${
            solid && !open ? "bg-ivory/80 backdrop-blur-xl border-b border-ink/10" : "bg-transparent"
          }`}
        />
        <div className={`relative max-w-[1600px] mx-auto px-5 md:px-10 h-20 flex items-center justify-between transition-colors duration-700 ${open ? "text-ivory" : tone}`}>
          {/* Wordmark */}
          <a href="#" className="group flex items-center gap-3" aria-label="Vayana Textiles home" data-magnetic="0.2">
            <LotusMark className="w-8 h-8 sm:w-9 sm:h-9 text-gold transition-transform duration-1000 ease-luxe group-hover:rotate-[360deg]" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-[0.18em]">VAYANA</span>
              <span className="eyebrow text-[8px] tracking-[0.3em] sm:tracking-[0.5em] text-gold mt-1">Textiles · Odisha</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="group eyebrow text-[10.5px] tracking-[0.26em]">
                <RollText>{label}</RollText>
              </a>
            ))}
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-2 md:gap-4">
            <button type="button" aria-label="Search collection" className="hidden sm:block p-2.5 rounded-full hover:text-gold transition-colors" data-magnetic="0.4">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative p-2.5 rounded-full hover:text-gold transition-colors"
              data-magnetic="0.4"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span
                ref={cartRef}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-maroon text-ivory text-[9px] font-semibold flex items-center justify-center"
              >
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="group ml-1 flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full border border-current/25 hover:border-gold transition-colors"
              data-magnetic="0.3"
            >
              <span className="eyebrow text-[10px] hidden sm:block">{open ? "Close" : "Menu"}</span>
              <span className="relative w-9 h-9 rounded-full bg-gold text-ink flex items-center justify-center">
                <span className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-luxe ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
                <span className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-luxe ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div ref={progressRef} className="absolute left-0 bottom-0 h-px w-full bg-gold origin-left scale-x-0" />
      </header>

      {/* Full-screen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 hidden flex-col justify-between bg-ink text-ivory pt-32 pb-10 px-5 md:px-10"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="ikat-weave absolute inset-0 text-gold/[0.035] pointer-events-none" />
        <nav className="relative flex flex-col" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }, i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-5 md:gap-8 border-b border-ivory/10 py-3 md:py-4 overflow-hidden"
            >
              <span className="menu-link font-display italic text-gold text-lg md:text-2xl w-8">0{i + 1}</span>
              <span className="font-display text-5xl md:text-8xl leading-none transition-[translate,color] duration-700 ease-luxe group-hover:translate-x-4 group-hover:text-gold group-hover:italic">
                <span className="menu-link inline-block">{label}</span>
              </span>
            </a>
          ))}
        </nav>
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 text-sand/70">
          <div className="menu-meta">
            <p className="eyebrow text-gold mb-2">Private Salon</p>
            <a href="mailto:concierge@vayanatextiles.com" className="link-slide font-display text-xl text-ivory">
              concierge@vayanatextiles.com
            </a>
          </div>
          <p className="menu-meta eyebrow text-[10px]">Bhubaneswar · Sambalpur · Worldwide</p>
        </div>
      </div>
    </>
  );
}
