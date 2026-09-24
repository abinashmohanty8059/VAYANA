import SareeCloth from "@/components/saree/SareeCloth";
import { Arrow } from "@/components/ui/Ornaments";

export default function SareeSection() {
  return (
    <section
      id="drape"
      className="relative h-[100svh] min-h-[640px] bg-ink text-ivory overflow-hidden"
      aria-label="A Vayana saree carried by the wind"
      data-cursor="Stir"
    >
      {/* Warm glow behind the silk */}
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_55%_at_55%_50%,rgba(142,31,37,0.45),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="ikat-weave absolute inset-0 text-gold/[0.03] pointer-events-none" aria-hidden="true" />

      <SareeCloth className="absolute inset-0" />

      {/* Edge fades into the neighbouring sections */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 h-full max-w-[1600px] mx-auto px-5 md:px-10 py-24 md:py-28 flex flex-col justify-between pointer-events-none">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 eyebrow text-gold" data-reveal="left">
            <span className="h-px w-10 bg-current opacity-60" />
            <span>Off the loom</span>
          </div>
          <h2 className="mt-6 font-display text-[12vw] md:text-[6vw] leading-[0.92] tracking-[-0.03em]" data-split="lines">
            The drape, <em className="text-gold-light">set free.</em>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="max-w-sm text-[15px] leading-[1.8] text-sand/70" data-reveal="up">
            Forty-two days on the loom, six yards of mulberry silk, and a zari border that catches every breath of wind.
            Move across the silk to stir it.
          </p>
          <a
            href="#collection"
            className="pointer-events-auto btn-lux border border-ivory/40 text-ivory hover:text-ink [--btn-fill:var(--color-gold)] self-start md:self-auto"
            data-magnetic="0.25"
          >
            Find your drape <Arrow className="btn-arrow w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
