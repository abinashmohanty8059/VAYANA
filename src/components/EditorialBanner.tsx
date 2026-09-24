import Image from "next/image";
import { Arrow } from "@/components/ui/Ornaments";

const BANNER_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnDcyT2vnU4s7Zmh3lMAggVZXZ1LJNEv5KWHicnn9gl_H8nBcl2r3jqr51Sq6QubC1-Ppg7vO8hU-BnLoQd0RthpMD0OFyPFYDYMoHdTLKPhnMAEPXXN7DuryuVzY4PEkDN4kS0SE0u3UJM5imuCjgw1ASNxFfE0fk7oz80PjA40qgl0OqyrsmugA-8rxiegZkKWA11wB1mxRAq5AjJ-MlFcdescI8ky8SHYjW-kSZ4dtC1CrZ9YaN";

export default function EditorialBanner() {
  return (
    <section className="relative min-h-[120vh] flex items-center bg-ink text-ivory overflow-hidden" aria-label="Editorial banner">
      <div className="absolute inset-x-0 -inset-y-[20%]" data-parallax="0.18">
        <Image src={BANNER_IMG} alt="" fill sizes="100vw" className="object-cover opacity-45 grayscale-[35%]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/30 to-ink" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(15,13,12,0.85)_75%)]" aria-hidden="true" />

      {/* Corner frame marks */}
      {["top-8 left-8 border-t border-l", "top-8 right-8 border-t border-r", "bottom-8 left-8 border-b border-l", "bottom-8 right-8 border-b border-r"].map((c) => (
        <span key={c} className={`absolute w-10 h-10 border-gold/60 ${c}`} aria-hidden="true" />
      ))}

      <div className="relative z-10 max-w-[1300px] mx-auto px-5 md:px-10 py-32 text-center">
        <p className="eyebrow text-gold-light" data-reveal="fade">
          Odisha · Sacred weaves
        </p>
        <h2 className="mt-10 font-display text-[11vw] md:text-[6.4vw] leading-[1] tracking-[-0.025em]" data-scrub>
          &ldquo;Every thread carries a <em className="text-gold">prayer</em>, every border a temple.&rdquo;
        </h2>
        <p className="mt-10 font-display italic text-xl md:text-2xl text-sand/80 max-w-2xl mx-auto" data-reveal="up">
          A symphony of Kalinga architecture, divine mathematics and handwoven luxury — built to be cherished across
          lifetimes.
        </p>
        <div className="mt-14 flex flex-wrap justify-center gap-5" data-reveal="up" data-delay="0.15">
          <a href="#collection" className="btn-lux bg-gold text-ink hover:text-ink [--btn-fill:var(--color-ivory)]" data-magnetic="0.25">
            Explore the Kalinga edit <Arrow className="btn-arrow w-4 h-4" />
          </a>
          <a href="#story" className="btn-lux border border-ivory/40 text-ivory hover:text-ink [--btn-fill:var(--color-ivory)]" data-magnetic="0.25">
            Read the founders&apos; note
          </a>
        </div>
      </div>
    </section>
  );
}
