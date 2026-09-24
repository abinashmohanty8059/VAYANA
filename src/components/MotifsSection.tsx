import { SectionLabel } from "@/components/ui/Ornaments";

const MOTIFS = [
  {
    name: "Padma",
    subtitle: "The Sacred Lotus",
    description:
      "Purity of soul and timeless rebirth. Woven along temple borders as an invitation to tranquillity and spiritual bloom.",
    icon: (
      <>
        <path d="M32 10c-4 7-7 13-7 19s3.4 10 7 10 7-4 7-10-3-12-7-19z" />
        <path d="M21 21c-5 5-7 11-5 15.5s7 5.5 13.5 3.8" />
        <path d="M43 21c5 5 7 11 5 15.5s-7 5.5-13.5 3.8" />
        <path d="M10 36c4 6 12 8.5 22 6 10 2.5 18 0 22-6" />
        <path d="M18 50h28" />
      </>
    ),
  },
  {
    name: "Mayura",
    subtitle: "The Royal Peacock",
    description:
      "Grace, majesty and the monsoon's arrival — embodied in the Vayana crest and the royal courts of Utkala.",
    icon: (
      <>
        <path d="M26 52c0-10 2-18 6-24" />
        <path d="M32 28c-3-5-3-10 0-14 3 4 3 9 0 14z" />
        <circle cx="32" cy="12" r="2" />
        <path d="M32 28c6-6 14-8 20-6-2 8-10 12-18 11" />
        <path d="M34 33c8 0 15 4 18 10-7 3-15 1-19-5" />
        <circle cx="46" cy="25" r="2.5" />
        <circle cx="45" cy="40" r="2.5" />
      </>
    ),
  },
  {
    name: "Kumbha",
    subtitle: "Temple Spire Border",
    description:
      "The serrated temple silhouette along the selvedge, drawn to protect the wearer and carry Puri Jagannath's divine aura.",
    icon: (
      <>
        <path d="M32 8L16 30h8v22h16V30h8L32 8z" />
        <path d="M24 30l8-11 8 11" />
        <path d="M28 52V40h8v12" />
        <path d="M8 54h48" />
      </>
    ),
  },
  {
    name: "Shankha",
    subtitle: "The Sacred Conch",
    description:
      "The eternal sound of creation. Woven into the pallu as a harbinger of peace, fortune and auspicious beginnings.",
    icon: (
      <>
        <path d="M20 44c-6-8-6-20 4-28 8-6 20-4 24 4 4 8-2 16-10 16-6 0-9-5-7-9 2-3 6-3 7 0" />
        <path d="M20 44l-6 8h14l-2-6" />
        <path d="M44 34c3 6 1 12-5 16" />
      </>
    ),
  },
];

function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg viewBox="-200 -200 400 400" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      {[190, 160, 120, 70, 30].map((r) => (
        <circle key={r} r={r} strokeWidth="0.6" />
      ))}
      {petals.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d="M0 -70 C 18 -100 18 -130 0 -160 C -18 -130 -18 -100 0 -70z" strokeWidth="0.6" />
          <path d="M0 -120 L0 -190" strokeWidth="0.4" strokeDasharray="2 4" />
          <circle cy="-175" r="3" strokeWidth="0.6" />
        </g>
      ))}
      {petals.filter((_, i) => i % 2 === 0).map((a) => (
        <path key={`d${a}`} transform={`rotate(${a + 7.5})`} d="M0 -30 L10 -50 L0 -70 L-10 -50z" strokeWidth="0.6" />
      ))}
    </svg>
  );
}

export default function MotifsSection() {
  return (
    <section id="motifs" className="relative bg-ivory py-28 md:py-40 overflow-hidden" aria-label="Cultural motifs">
      <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[130vw] md:w-[80vw] max-w-[1200px] aspect-square text-gold/20 pointer-events-none">
        <div className="w-full h-full" data-spin="120">
          <Mandala className="w-full h-full animate-spin-slower" />
        </div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="flex flex-col items-center text-center">
          <SectionLabel index="04">The Sacred Codex</SectionLabel>
          <h2 className="mt-8 font-display text-[12vw] md:text-[7vw] leading-[0.92] tracking-[-0.03em] max-w-[16ch]" data-split="words">
            The sacred <em className="text-maroon">motifs</em> of Odisha
          </h2>
          <p className="mt-6 font-display italic text-xl text-ink/60 max-w-xl" data-reveal="fade">
            Ancient symbology and blessings woven into every metre of cloth.
          </p>
        </div>

        <div
          className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-ink/15 bg-ivory/70 backdrop-blur-sm"
          data-stagger="0.12"
        >
          {MOTIFS.map((m, i) => (
            <div
              key={m.name}
              className="group relative border-r border-b border-ink/15 p-8 md:p-10 min-h-[440px] flex flex-col overflow-hidden"
            >
              {/* Hover flood */}
              <div className="absolute inset-0 bg-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-[900ms] ease-luxe" />

              <div className="relative flex items-center justify-between">
                <span className="font-display italic text-lg text-gold">0{i + 1}</span>
                <span className="eyebrow text-[9px] text-taupe group-hover:text-gold-light transition-colors duration-700">
                  {m.subtitle}
                </span>
              </div>

              <div className="relative py-12 flex justify-center">
                <div className="relative w-32 h-32 rounded-full border border-gold/40 flex items-center justify-center transition-transform duration-[1.2s] ease-luxe group-hover:scale-110 group-hover:rotate-[20deg]">
                  <div className="absolute inset-2 rounded-full border border-dashed border-gold/30" />
                  <svg
                    viewBox="0 0 64 64"
                    className="w-[4.5rem] h-[4.5rem] text-maroon group-hover:text-gold-light transition-colors duration-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-draw
                  >
                    {m.icon}
                  </svg>
                </div>
              </div>

              <div className="relative mt-auto">
                <h3 className="font-display text-4xl group-hover:text-ivory transition-colors duration-700">{m.name}</h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-ink/60 group-hover:text-sand/85 transition-colors duration-700">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
