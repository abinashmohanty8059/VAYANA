import Image from "next/image";
import { SectionLabel } from "@/components/ui/Ornaments";

const TEMPLE_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDC4E8uceW9-3fAzWIds4SCn-1TTzTCZQ-swWs6OSgbxQ8b_eLLVcz5q60YVzZxGMVFRtfFnDXQlHGtYa5UPgk9B6tKns2QSkvPc6VP3s4oxNX85jbDsJmSCZ6aRAkeqbuFs3B3L3CQWRKu_cbbvV65QQmbjJOBmyr9iaiQUE8DCJ2pWOxOAR-g7I0ewdTwgchav5x71tOF3q4Q4j5Vw3Yt3kKYYG9JA7O4wSCH-Jmc1gtqqRlFnDic";
const LOOM_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnDcyT2vnU4s7Zmh3lMAggVZXZ1LJNEv5KWHicnn9gl_H8nBcl2r3jqr51Sq6QubC1-Ppg7vO8hU-BnLoQd0RthpMD0OFyPFYDYMoHdTLKPhnMAEPXXN7DuryuVzY4PEkDN4kS0SE0u3UJM5imuCjgw1ASNxFfE0fk7oz80PjA40qgl0OqyrsmugA-8rxiegZkKWA11wB1mxRAq5AjJ-MlFcdescI8ky8SHYjW-kSZ4dtC1CrZ9YaN";

const STATS = [
  { value: 7, suffix: "", label: "Generations of master weavers" },
  { value: 250, suffix: "+", label: "Artisan families patronised" },
  { value: 45, suffix: "", label: "Days on the loom, per saree" },
];

export default function HeritageSection() {
  return (
    <section id="roots" className="relative bg-ivory py-28 md:py-40 overflow-hidden" aria-label="Heritage storytelling">
      {/* Oversized outline numeral */}
      <span
        className="absolute -top-10 right-[-4vw] font-display text-outline text-[38vw] leading-none text-ink/[0.06] select-none pointer-events-none"
        data-float="160"
        aria-hidden="true"
      >
        01
      </span>

      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10">
        <SectionLabel index="01">Roots &amp; Reverence</SectionLabel>

        <h2 className="mt-8 font-display text-[12vw] md:text-[7.5vw] leading-[0.92] tracking-[-0.03em] max-w-[14ch]" data-split="lines">
          Rooted in heritage, <em className="text-maroon">crafted for today.</em>
        </h2>

        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10">
          {/* Image montage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-[86%] overflow-hidden" data-clip="up" data-cursor="Konark">
              <div className="absolute inset-x-0 -inset-y-[12%]" data-parallax="0.1">
                <Image
                  src={TEMPLE_IMG}
                  alt="Woman in handwoven silk within a Kalinga temple courtyard"
                  fill
                  sizes="(max-width: 1024px) 86vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div
              className="absolute right-0 bottom-[-8%] w-[44%] aspect-square overflow-hidden border-[10px] border-ivory shadow-2xl"
              data-float="70"
            >
              <div className="relative w-full h-full" data-clip="left" data-delay="0.3">
                <Image src={LOOM_IMG} alt="Weaver's hands at a wooden pit loom" fill sizes="25vw" className="object-cover" />
              </div>
            </div>

            <div className="absolute left-[-1.25rem] top-10 hidden md:flex flex-col items-center gap-3" aria-hidden="true">
              <span className="eyebrow text-[9px] text-taupe [writing-mode:vertical-rl] rotate-180">Konark · Nuapatna</span>
              <span className="w-px h-20 bg-gold" />
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
            <p className="font-display text-3xl md:text-[2.6rem] leading-[1.18] text-ink" data-scrub>
              &ldquo;We do not manufacture textiles; we preserve living poetry, passed down through seven generations of
              master weavers.&rdquo;
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-8 text-[15px] leading-[1.8] text-ink/70" data-stagger>
              <p>
                In the river valleys of Odisha, weaving is a spiritual communion. The legendary <em>Bandhakala</em> Ikat
                demands mathematical brilliance — threads are dyed before weaving with millimetre accuracy so that sacred
                geometries emerge as the shuttle flies.
              </p>
              <p>
                Vayana honours this legacy with 100% direct artisan compensation, wild mulberry and tussar sericulture, and
                zero chemical run-off into the sacred waterways that feed the looms.
              </p>
            </div>

            <dl className="mt-14 pt-10 border-t border-ink/15 grid grid-cols-3 gap-6">
              {STATS.map(({ value, suffix, label }) => (
                <div key={label} data-reveal="up">
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-5xl md:text-6xl text-maroon leading-none">
                    <span data-counter={value}>{value}</span>
                    <span className="text-gold">{suffix}</span>
                  </dd>
                  <p className="mt-3 eyebrow text-[9px] leading-relaxed tracking-[0.2em] text-taupe">{label}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
