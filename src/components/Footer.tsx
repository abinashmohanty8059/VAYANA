import { LotusMark, RollText } from "@/components/ui/Ornaments";

const COLLECTIONS = ["Sambalpuri Silk", "Bomkai Heirloom", "Wild Tussar Stoles", "Bridal Drapes", "Temple Borders"];
const CRAFT_LINKS = [
  { href: "#craft", label: "The Bandha Mathematics" },
  { href: "#craft", label: "Botanical Dye Vats" },
  { href: "#motifs", label: "Sacred Motif Codex" },
  { href: "#pillars", label: "Weaver Welfare Fund" },
  { href: "#story", label: "Certificate Registry" },
];
const SOCIAL = ["Instagram", "Craft Journal", "Bespoke Salon"];

export default function Footer() {
  return (
    <footer className="relative bg-ink text-ivory pt-24 md:pt-32 overflow-hidden" aria-label="Site footer">
      <div className="hairline-grid absolute inset-0 text-ivory/[0.035] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14" data-stagger="0.1">
          <div className="lg:col-span-4 lg:pr-10">
            <LotusMark className="w-12 h-12 text-gold" />
            <p className="mt-8 font-display text-3xl leading-snug max-w-sm">
              Preserving the rare double-Ikat traditions of Odisha — <em className="text-gold">one heirloom at a time.</em>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="group px-4 py-2 rounded-full border border-ivory/20 eyebrow text-[9px] hover:border-gold hover:text-gold transition-colors duration-500"
                >
                  <RollText>{s}</RollText>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="eyebrow text-gold mb-6">Collections</h4>
            <ul className="space-y-3">
              {COLLECTIONS.map((item) => (
                <li key={item}>
                  <a href="#collection" className="group text-[15px] text-sand/75 hover:text-ivory transition-colors">
                    <RollText>{item}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="eyebrow text-gold mb-6">Craft &amp; Roots</h4>
            <ul className="space-y-3">
              {CRAFT_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a href={href} className="group text-[15px] text-sand/75 hover:text-ivory transition-colors">
                    <RollText>{label}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="eyebrow text-gold mb-6">Client Concierge</h4>
            <p className="text-[15px] text-sand/70 leading-relaxed">Private styling appointments &amp; bespoke bridal consultations.</p>
            <a href="mailto:concierge@vayanatextiles.com" className="link-slide mt-4 inline-block font-display text-xl hover:text-gold transition-colors">
              concierge@vayanatextiles.com
            </a>
            <p className="mt-3 text-[13px] text-gold/90 tracking-wide">+91 674 295 8890 · +91 94370 12899</p>
            <span className="mt-6 inline-block px-4 py-2 rounded-full border border-gold/40 eyebrow text-[9px] text-gold">
              Worldwide insured transit
            </span>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-5 eyebrow text-[9px] text-sand/45">
          <p>© {new Date().getFullYear()} Vayana Textiles · Handwoven in Odisha, India</p>
          <div className="flex gap-6">
            <a href="#" className="link-slide hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="link-slide hover:text-gold transition-colors">Terms of Heirloom Service</a>
            <a href="#" className="link-slide hover:text-gold transition-colors">GI Authenticity</a>
          </div>
          <a href="#" className="group flex items-center gap-3 text-ivory/70 hover:text-gold transition-colors" data-magnetic="0.3">
            <RollText>Back to top</RollText>
            <span className="w-9 h-9 rounded-full border border-current flex items-center justify-center transition-transform duration-700 ease-luxe group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative mt-10 select-none pointer-events-none" aria-hidden="true">
        <p
          className="font-display text-center text-[27vw] leading-[0.78] tracking-[-0.04em] text-gold-foil translate-y-[12%]"
          data-clip="up"
        >
          VAYANA
        </p>
      </div>
    </footer>
  );
}
