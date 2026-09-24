import Image from "next/image";
import { RotatingSeal, SectionLabel } from "@/components/ui/Ornaments";

const WEAVER_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnDcyT2vnU4s7Zmh3lMAggVZXZ1LJNEv5KWHicnn9gl_H8nBcl2r3jqr51Sq6QubC1-Ppg7vO8hU-BnLoQd0RthpMD0OFyPFYDYMoHdTLKPhnMAEPXXN7DuryuVzY4PEkDN4kS0SE0u3UJM5imuCjgw1ASNxFfE0fk7oz80PjA40qgl0OqyrsmugA-8rxiegZkKWA11wB1mxRAq5AjJ-MlFcdescI8ky8SHYjW-kSZ4dtC1CrZ9YaN";
const DRAPE_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB9GWQUIpIrs81E8-MKzUPQ43j0v--X7JJiP-WBI3eKE1Z7llgvf3CN2_6icP8YnoWAFPwu0bt6C5hN8u7o4itZvIq8Sjv75uFVy12jiFVCQ5Ybljll1Try_OaD7OmdY6OF-j3-5-CCq4BWiQkivN2nmWPJSnPzGSl6ZzNDQhS0pypF85_w0CpuDbHaZddPSIVpkbyjl4iiLamYBpguVZzwo2od80p7ISwKVhOSypJX-osOQlGpCo4O";
const EMBLEM_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBShTKmrjaiVTMmdyKa1qdMtJlhSddhsnwXj0Sz8ZJeX5c9kPHhPnxWO8ckTdQ_9NflzVLHwfIa8fE4lR92OP10rxelVha1wmGz8Lavp-ITmiZAeBBGTIv3sgz9b9SiBNw8s9Q6PxOahgnkPwLZLSMJ7s-OSMZUy8a6KgdRRJcmB_eK7jTHKt1YB2GTEoMXUVNKYlCBzQwJOiWYyMkLpO7FA0X_RBrvqp7gcDx96dxKpTCllftW8_t3LbNgBS-HQcCDag";

export default function StorySection() {
  return (
    <section id="story" className="relative bg-ivory py-28 md:py-44 overflow-hidden" aria-label="Founders note">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-10 items-center">
        {/* Montage */}
        <div className="lg:col-span-6 relative min-h-[520px] md:min-h-[720px]">
          <div className="absolute left-0 top-0 w-[62%] aspect-[3/4] overflow-hidden" data-clip="down">
            <div className="absolute inset-x-0 -inset-y-[12%]" data-parallax="0.12">
              <Image src={WEAVER_IMG} alt="Weaver's hands on a traditional pit loom" fill sizes="40vw" className="object-cover" />
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-[50%] aspect-[4/5]" data-float="90">
            <div className="relative w-full h-full overflow-hidden" data-clip="up" data-delay="0.2">
              <Image src={DRAPE_IMG} alt="Folded Bomkai silk with temple border" fill sizes="30vw" className="object-cover" />
            </div>
          </div>
          <div className="absolute left-[46%] top-[52%] -translate-x-1/2 -translate-y-1/2 z-10" data-float="-60">
            <RotatingSeal
              text="AUTHENTIC HANDLOOM · VAYANA ATELIER · "
              className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-ivory shadow-2xl"
              ringClass="text-maroon"
            >
              <Image src={EMBLEM_IMG} alt="Vayana authentic handloom emblem" width={72} height={72} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
            </RotatingSeal>
          </div>
        </div>

        {/* Letter */}
        <div className="lg:col-span-5 lg:col-start-8">
          <SectionLabel index="06">Our Philosophy</SectionLabel>
          <h2 className="mt-8 font-display text-[12vw] md:text-[6vw] lg:text-[4.8vw] leading-[0.95] tracking-[-0.03em]" data-split="lines">
            A heritage, <em className="text-maroon">rewoven.</em>
          </h2>

          <div className="mt-10 space-y-6 text-[15.5px] leading-[1.85] text-ink/70" data-stagger>
            <p className="font-display italic text-2xl text-ink">Dear connoisseur,</p>
            <p>
              Vayana was born of reverence for the handloom treasures of Western and Coastal Odisha. Growing up amid the
              hypnotic clatter of pit looms in Bargarh, Nuapatna and Sonepur, we witnessed textiles that were not merely
              clothing, but sacred tapestries that took months to manifest.
            </p>
            <p>
              As fast fashion accelerated, centuries-old Bandha equations faced quiet extinction. Vayana is our
              uncompromising bridge — returning pride, dignity and global patronage to master weavers, while offering the
              discerning world silhouettes of timeless, regal sophistication.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-ink/15 flex items-end justify-between gap-6">
            <div>
              <p className="font-display italic text-lg text-ink/60">With heartfelt thanks,</p>
              <p className="mt-2 font-script text-6xl md:text-7xl text-maroon leading-none py-2 pr-6 -my-2" data-clip="left">
                Team Vayana
              </p>
            </div>
            <p className="eyebrow text-[9px] text-taupe text-right leading-relaxed">
              Bhubaneswar
              <br />
              &amp; Sambalpur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
