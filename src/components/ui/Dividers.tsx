import Marquee from "@/components/ui/Marquee";

export function IkatBand() {
  return <div className="ikat-band" role="presentation" aria-hidden="true" />;
}

/** Giant scroll-reactive ticker of weave names. */
export function WeaveMarquee({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className={`${dark ? "bg-ink text-ivory" : "bg-ivory text-ink"} py-8 md:py-10 border-y ${dark ? "border-gold/20" : "border-ink/10"}`} aria-hidden="true">
      <Marquee
        duration={50}
        items={[
          <span key="a" className="font-display text-6xl md:text-8xl">Sambalpuri</span>,
          <span key="b" className="font-display italic text-6xl md:text-8xl text-gold">Bomkai</span>,
          <span key="c" className="font-display text-6xl md:text-8xl text-outline">Kotpad</span>,
          <span key="d" className="font-display italic text-6xl md:text-8xl text-gold">Bandha</span>,
          <span key="e" className="font-display text-6xl md:text-8xl">Tussar</span>,
          <span key="f" className="font-display text-6xl md:text-8xl text-outline">Ikat</span>,
        ]}
        separator={<span className="mx-8 md:mx-12 text-gold text-3xl md:text-4xl">✦</span>}
      />
    </div>
  );
}

/** Thin credentials ticker. */
export function CredentialsMarquee() {
  return (
    <div className="bg-maroon text-ivory py-4 border-y border-gold/40" aria-hidden="true">
      <Marquee
        reverse
        duration={36}
        itemClassName="eyebrow text-[10px]"
        items={[
          "Complimentary worldwide white-glove shipping",
          "GI-tagged Odisha handloom",
          "Weaver provenance certificate with every drape",
          "Natural botanical dyes",
          "Bespoke bridal consultations",
        ]}
        separator={<span className="mx-6 text-gold">◆</span>}
      />
    </div>
  );
}
