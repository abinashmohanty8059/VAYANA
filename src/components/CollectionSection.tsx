"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap, Flip, useGSAP } from "@/lib/gsap";
import { CART_EVENT } from "@/components/Navbar";
import { Arrow, SectionLabel } from "@/components/ui/Ornaments";

interface Product {
  id: string;
  category: string;
  badge: string;
  image: string;
  alt: string;
  weaveType: string;
  name: string;
  subtitle: string;
  price: string;
  priceUSD: string;
  swatches: string[];
  quickViewDesc: string;
}

const PRODUCTS: Product[] = [
  {
    id: "neelambari",
    category: "sambalpuri",
    badge: "Masterpiece",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-volyhwMaESvlSKJXljofrPBT4fAllPOkDtMR_W_IIjlwa9Yu2sOAcyQqSv0JjP6fSR9rJr5RSvZNo247LKwzLyJep5L2ANaJKn5gqZQm_wOdSFTs6uyuLcmBX0U0WLv1h0ZrlM4eVep1GIEDpt-0r23sHYU1V-D6hmMMBDECzRo22G1rr2bisu3QDO5NP-U2qT0xzYfErvx-LVkgrAdpFk_4RowYFzoDjz6Vkk1OOXPN1u1lpdf0",
    alt: "The Neelambari Sambalpuri Silk Saree",
    weaveType: "Odisha Double Ikat",
    name: "The Neelambari Silk Saree",
    subtitle: "42 days on the loom of Master Weaver Rameshwar Meher",
    price: "₹48,500",
    priceUSD: "$580",
    swatches: ["#7A1B1C", "#C5A059", "#141312"],
    quickViewDesc: "Pure mulberry silk with intricate double-Ikat Bandha borders in deep crimson maroon and antique gold threads.",
  },
  {
    id: "bomkai",
    category: "bomkai",
    badge: "Pure Bomkai",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9GWQUIpIrs81E8-MKzUPQ43j0v--X7JJiP-WBI3eKE1Z7llgvf3CN2_6icP8YnoWAFPwu0bt6C5hN8u7o4itZvIq8Sjv75uFVy12jiFVCQ5Ybljll1Try_OaD7OmdY6OF-j3-5-CCq4BWiQkivN2nmWPJSnPzGSl6ZzNDQhS0pypF85_w0CpuDbHaZddPSIVpkbyjl4iiLamYBpguVZzwo2od80p7ISwKVhOSypJX-osOQlGpCo4O",
    alt: "The Bomkai Royal Heirloom Drapes",
    weaveType: "Ganjam Bomkai Weave",
    name: "The Bomkai Royal Heirloom",
    subtitle: "Antique zari filaments & Kumbha temple borders",
    price: "₹62,000",
    priceUSD: "$745",
    swatches: ["#5C1415", "#D4AF37"],
    quickViewDesc: "Folded Bomkai silk saree highlighting the iconic temple border (kumbha) and geometric diamond lozenges.",
  },
  {
    id: "kalinga",
    category: "dupattas",
    badge: "Festive Edit",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC4E8uceW9-3fAzWIds4SCn-1TTzTCZQ-swWs6OSgbxQ8b_eLLVcz5q60YVzZxGMVFRtfFnDXQlHGtYa5UPgk9B6tKns2QSkvPc6VP3s4oxNX85jbDsJmSCZ6aRAkeqbuFs3B3L3CQWRKu_cbbvV65QQmbjJOBmyr9iaiQUE8DCJ2pWOxOAR-g7I0ewdTwgchav5x71tOF3q4Q4j5Vw3Yt3kKYYG9JA7O4wSCH-Jmc1gtqqRlFnDic",
    alt: "Kalinga Crimson Festival Dupatta",
    weaveType: "Odisha Silk Dupatta",
    name: "Kalinga Crimson Dupatta",
    subtitle: "Tasselled pallu in Royal Indigo & Ochre",
    price: "₹24,000",
    priceUSD: "$290",
    swatches: ["#B24C19", "#1B2A4A", "#C5A059"],
    quickViewDesc: "Flowing handwoven Odisha silk stole featuring royal blue borders and golden rust orange base.",
  },
  {
    id: "tussar",
    category: "sambalpuri",
    badge: "Loom Rare",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnDcyT2vnU4s7Zmh3lMAggVZXZ1LJNEv5KWHicnn9gl_H8nBcl2r3jqr51Sq6QubC1-Ppg7vO8hU-BnLoQd0RthpMD0OFyPFYDYMoHdTLKPhnMAEPXXN7DuryuVzY4PEkDN4kS0SE0u3UJM5imuCjgw1ASNxFfE0fk7oz80PjA40qgl0OqyrsmugA-8rxiegZkKWA11wB1mxRAq5AjJ-MlFcdescI8ky8SHYjW-kSZ4dtC1CrZ9YaN",
    alt: "Artisan Pit Loom Tussar Silk Saree",
    weaveType: "Tussar Pit Loom Weave",
    name: "Utkala Tussar Bandha Silk",
    subtitle: "Shankha (conch) & lotus geometric repeats",
    price: "₹36,000",
    priceUSD: "$435",
    swatches: ["#8C2224", "#B89047"],
    quickViewDesc: "Woven on organic wooden pit looms with hand-twisted wild tussar raw yarn.",
  },
];

const FILTERS = [
  { key: "all", label: "All pieces" },
  { key: "sambalpuri", label: "Sambalpuri" },
  { key: "bomkai", label: "Bomkai Ikat" },
  { key: "dupattas", label: "Dupattas" },
];

function ProductCard({
  product,
  index,
  hidden,
  offset,
  onView,
  onAdd,
}: {
  product: Product;
  index: number;
  hidden: boolean;
  offset: boolean;
  onView: () => void;
  onAdd: () => void;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const tilt = useRef<{ rx: gsap.QuickToFunc; ry: gsap.QuickToFunc } | null>(null);

  useGSAP(() => {
    gsap.set(tiltRef.current, { transformPerspective: 1100 });
    tilt.current = {
      rx: gsap.quickTo(tiltRef.current, "rotationX", { duration: 0.8, ease: "power3" }),
      ry: gsap.quickTo(tiltRef.current, "rotationY", { duration: 0.8, ease: "power3" }),
    };
  });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    tilt.current?.ry((x - 0.5) * 12);
    tilt.current?.rx(-(y - 0.5) * 12);
    e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    e.currentTarget.style.setProperty("--my", `${y * 100}%`);
  }
  function onLeave() {
    tilt.current?.rx(0);
    tilt.current?.ry(0);
  }

  return (
    <article
      className={`product-card ${hidden ? "hidden" : ""} ${offset ? "lg:mt-28" : ""}`}
      data-flip-id={product.id}
    >
      <div ref={tiltRef} className="group will-change-transform" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div
          className="relative aspect-[3/4] overflow-hidden bg-bone cursor-pointer"
          onClick={onView}
          data-cursor="View"
          role="button"
          tabIndex={0}
          aria-label={`Quick view: ${product.name}`}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onView())}
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-[scale,filter] duration-[1.6s] ease-luxe group-hover:scale-110 saturate-[0.9] group-hover:saturate-100"
          />
          {/* Pointer-tracking sheen */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-soft-light pointer-events-none"
            style={{ background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,240,210,0.7), transparent 45%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

          <span className="absolute top-4 left-4 font-display italic text-ivory/90 text-sm">Nº 0{index + 1}</span>
          <span className="absolute top-4 right-4 eyebrow text-[8.5px] tracking-[0.25em] px-3 py-1.5 rounded-full bg-ivory/90 text-ink backdrop-blur">
            {product.badge}
          </span>

          <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-[140%] group-hover:translate-y-0 transition-transform duration-700 ease-luxe">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="flex-1 py-3 rounded-full bg-ivory text-ink eyebrow text-[9.5px] hover:bg-gold transition-colors duration-500"
            >
              Add to curation
            </button>
          </div>
        </div>

        <div className="pt-5 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-[9px] text-maroon">{product.weaveType}</p>
            <h3 className="mt-2 font-display text-[1.45rem] leading-tight transition-colors duration-500 group-hover:text-maroon">
              {product.name}
            </h3>
            <p className="mt-1.5 text-[13px] text-ink/55 leading-snug">{product.subtitle}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display text-lg">{product.price}</p>
            <p className="text-[11px] text-ink/45">{product.priceUSD}</p>
            <div className="mt-2 flex justify-end -space-x-1" aria-hidden="true">
              {product.swatches.map((c) => (
                <span key={c} className="w-3 h-3 rounded-full ring-2 ring-ivory" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function QuickView({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline()
        .from(".qv-backdrop", { autoAlpha: 0, duration: 0.6, ease: "power2.out" })
        .from(".qv-panel", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, 0)
        .from(".qv-img", { scale: 1.3, duration: 1.6 }, 0.2)
        .from(".qv-item", { y: 30, autoAlpha: 0, stagger: 0.06, duration: 1 }, 0.5);
    },
    { scope: ref }
  );

  function close() {
    if (tl.current) tl.current.timeScale(1.8).reverse().eventCallback("onReverseComplete", onClose);
    else onClose();
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="qv-backdrop absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={close} />
      <div className="qv-panel relative w-full max-w-4xl grid md:grid-cols-2 bg-ivory text-ink overflow-hidden shadow-2xl">
        <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden bg-bone">
          <Image src={product.image} alt={product.alt} fill sizes="(max-width: 768px) 100vw, 450px" className="qv-img object-cover object-top" />
        </div>
        <div className="p-8 md:p-12 flex flex-col">
          <button type="button" onClick={close} className="qv-item self-end eyebrow text-[10px] link-slide" aria-label="Close quick view">
            Close ✕
          </button>
          <p className="qv-item mt-6 eyebrow text-gold">Atelier specification</p>
          <h3 className="qv-item mt-3 font-display text-4xl leading-tight">{product.name}</h3>
          <p className="qv-item mt-3 font-display text-xl text-maroon">
            {product.price} <span className="text-ink/40 text-base">/ {product.priceUSD}</span>
          </p>
          <p className="qv-item mt-5 text-sm leading-relaxed text-ink/70">{product.quickViewDesc}</p>
          <dl className="qv-item mt-6 pt-6 border-t border-ink/10 space-y-2.5 text-[13px]">
            {[
              ["Origin", "Nuapatna / Sambalpur cluster"],
              ["Fabric", "100% mulberry silk, real antique zari"],
              ["On the loom", "42 days, single weaver"],
              ["Care", "Dry clean; store in muslin"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-ink/45">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            onClick={() => {
              onAdd();
              close();
            }}
            className="qv-item mt-10 btn-lux w-full bg-ink text-ivory hover:text-ink"
          >
            Add piece to bag <Arrow className="btn-arrow w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ name, onDone }: { name: string; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap
      .timeline({ onComplete: onDone })
      .from(ref.current, { yPercent: 140, autoAlpha: 0, duration: 0.9 })
      .from(".toast-bar", { scaleX: 0, duration: 3, ease: "none" }, 0)
      .to(ref.current, { yPercent: 140, autoAlpha: 0, duration: 0.6, ease: "power3.in" }, 3.1);
  }, { scope: ref });
  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-[85] w-[min(360px,calc(100vw-3rem))] bg-ink text-ivory overflow-hidden shadow-2xl" role="status" aria-live="polite">
      <div className="p-5 flex items-center gap-4">
        <span className="w-9 h-9 rounded-full bg-gold text-ink flex items-center justify-center">✓</span>
        <div>
          <p className="text-[13px] font-semibold">{name}</p>
          <p className="text-[11px] text-sand/60 mt-0.5">Added to your curation · insured transit included</p>
        </div>
      </div>
      <div className="toast-bar h-0.5 bg-gold origin-left" />
    </div>
  );
}

export default function CollectionSection() {
  const [active, setActive] = useState("all");
  const [modal, setModal] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ key: number; name: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const filterRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const flipState = useRef<Flip.FlipState | null>(null);

  useEffect(() => setMounted(true), []);

  // Sliding pill behind the active filter; re-measured once fonts land and on resize.
  const activeRef = useRef(active);
  activeRef.current = active;
  const placePill = (duration: number) => {
    const btn = filterRefs.current[activeRef.current];
    if (btn && pillRef.current)
      gsap.to(pillRef.current, { x: btn.offsetLeft, width: btn.offsetWidth, duration, ease: "luxe", overwrite: true });
  };
  useLayoutEffect(() => placePill(0.8), [active]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const snap = () => placePill(0);
    document.fonts?.ready.then(snap);
    window.addEventListener("resize", snap);
    return () => window.removeEventListener("resize", snap);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 1,
      ease: "luxe",
      absolute: true,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 1 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.6 }),
    });
    flipState.current = null;
  }, [active]);

  function selectFilter(key: string) {
    if (key === active) return;
    flipState.current = Flip.getState(gridRef.current!.querySelectorAll(".product-card"));
    setActive(key);
  }

  function addToCart(name: string) {
    window.dispatchEvent(new Event(CART_EVENT));
    setToast({ key: Date.now(), name });
  }

  let visibleIdx = 0;

  return (
    <section id="collection" className="relative bg-bone py-28 md:py-40" aria-label="Product showcase">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-24">
          <div>
            <SectionLabel index="02">Atelier Curations</SectionLabel>
            <h2 className="mt-8 font-display text-[13vw] md:text-[8vw] leading-[0.88] tracking-[-0.035em]" data-split="chars">
              The <em className="text-maroon">Collection</em>
            </h2>
            <p className="mt-6 font-display italic text-xl text-ink/60" data-reveal="fade">
              Tradition, woven into every thread.
            </p>
          </div>

          <div className="relative inline-flex self-start lg:self-auto max-w-full overflow-x-auto [scrollbar-width:none] p-1.5 rounded-full border border-ink/15 bg-ivory/60 backdrop-blur" role="tablist" data-reveal="up">
            <span ref={pillRef} className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-ink" aria-hidden="true" />
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                ref={(el) => {
                  filterRefs.current[key] = el;
                }}
                type="button"
                role="tab"
                aria-selected={active === key}
                onClick={() => selectFilter(key)}
                className={`relative z-10 shrink-0 whitespace-nowrap px-4 md:px-5 py-2.5 rounded-full eyebrow text-[9.5px] tracking-[0.2em] transition-colors duration-500 ${
                  active === key ? "text-ivory" : "text-ink/70 hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16" data-stagger="0.15">
          {PRODUCTS.map((p, i) => {
            const hidden = active !== "all" && p.category !== active;
            const offset = !hidden && visibleIdx++ % 2 === 1;
            return (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                hidden={hidden}
                offset={offset}
                onView={() => setModal(p)}
                onAdd={() => addToCart(p.name)}
              />
            );
          })}
        </div>

        <div className="mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-ink/15 pt-10" data-reveal="up">
          <p className="font-display italic text-2xl text-ink/70">36 heirlooms in the full archive.</p>
          <a href="#collection" className="btn-lux border border-ink text-ink hover:text-ivory [--btn-fill:var(--color-ink)]" data-magnetic="0.25">
            View the archive <Arrow className="btn-arrow w-4 h-4" />
          </a>
        </div>
      </div>

      {mounted &&
        createPortal(
          <>
            {modal && <QuickView product={modal} onClose={() => setModal(null)} onAdd={() => addToCart(modal.name)} />}
            {toast && <Toast key={toast.key} name={toast.name} onDone={() => setToast(null)} />}
          </>,
          document.body
        )}
    </section>
  );
}
