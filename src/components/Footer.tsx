import Image from "next/image";

const COLLECTIONS = ["Sambalpuri Silk", "Bomkai Heirloom", "Wild Tussar Stoles", "Bridal Drapes", "Temple Borders"];
const CRAFT_LINKS = [
  { href: "#craft", label: "The Bandha Mathematics" },
  { href: "#craft", label: "Natural Dye Botanical Vats" },
  { href: "#motifs", label: "Sacred Motif Codex" },
  { href: "#pillars", label: "Weaver Welfare Fund" },
  { href: "#story", label: "Certificate Registry" },
];

export default function Footer() {
  return (
    <footer className="bg-vayana-charcoal text-vayana-cream pt-16 pb-12 relative" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD68HxlYrsL5vjjeMBewTu5PxdVGJ_mh5SCpkX3wptFw2lyio5fa-cPEbpgyytmF42W6Ek6XNexgih1G08jiQhnS6wEed_Mpw7LmLnElWtcMydC9dMTWKU7leBMWSde9UaSEhn2Y1izHeK1zsj4nvVB2rJ2iZMOkh7ZQssWWDcIwqxn_BXBK3A4g1T7lU7OWoGkZnzXI5sPRXSjvo2JYw0pvKgfm8RUc-xBv6PTwABRlfGO83bovvIeFWUU6QiXzGxGyg"
                alt="Vayana Textiles Logo"
                width={56}
                height={56}
                className="h-14 w-auto object-contain brightness-110"
              />
              <div className="flex flex-col">
                <span className="font-luxury-display text-xl tracking-widest text-vayana-cream font-bold">VAYANA</span>
                <span className="text-[9px] uppercase tracking-widest text-vayana-gold font-medium">WEAR YOUR HERITAGE</span>
              </div>
            </div>
            <p className="text-xs text-vayana-sand/70 font-sans leading-relaxed font-light pr-4">
              Preserving the rare double-Ikat Sambalpuri, Bomkai, and Kotpad weaving traditions of Odisha. Honoring
              250+ artisan families with every handcrafted meter.
            </p>
            <div className="flex space-x-4 pt-2 text-vayana-gold text-xs">
              <a href="#" className="hover:text-vayana-cream transition-colors" aria-label="Instagram">Instagram</a>
              <a href="#" className="hover:text-vayana-cream transition-colors" aria-label="Craft Journal">Craft Journal</a>
              <a href="#" className="hover:text-vayana-cream transition-colors" aria-label="Bespoke Salon">Bespoke Salon</a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h4 className="font-luxury-display text-xs uppercase tracking-widest text-vayana-gold font-semibold mb-1">
              Collections
            </h4>
            {COLLECTIONS.map((item) => (
              <a
                key={item}
                href="#collection"
                className="text-xs text-vayana-sand/80 hover:text-vayana-cream transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Column 3: Craft & Roots */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="font-luxury-display text-xs uppercase tracking-widest text-vayana-gold font-semibold mb-1">
              Craft &amp; Roots
            </h4>
            {CRAFT_LINKS.map(({ href, label }) => (
              <a key={label} href={href} className="text-xs text-vayana-sand/80 hover:text-vayana-cream transition-colors">
                {label}
              </a>
            ))}
          </div>

          {/* Column 4: Client Concierge */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="font-luxury-display text-xs uppercase tracking-widest text-vayana-gold font-semibold mb-1">
              Client Concierge
            </h4>
            <p className="text-xs text-vayana-sand/70 font-sans leading-relaxed">
              Private styling appointments &amp; bespoke bridal consultations:
            </p>
            <a
              href="mailto:concierge@vayanatextiles.com"
              className="text-xs text-vayana-cream font-medium tracking-wide hover:text-vayana-gold transition-colors"
            >
              concierge@vayanatextiles.com
            </a>
            <span className="text-xs text-vayana-gold tracking-wider">
              +91 674 295 8890 / +91 94370 12899
            </span>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 border border-vayana-gold/40 text-[9px] uppercase tracking-widest text-vayana-gold">
                Worldwide Insured Transit
              </span>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-vayana-gold/20 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-wider uppercase text-vayana-sand/60 gap-4">
          <p>© 2025 VAYANA TEXTILES. ALL RIGHTS RESERVED. HANDWOVEN IN ODISHA, INDIA.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-vayana-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-vayana-gold transition-colors">Terms of Heirloom Service</a>
            <a href="#" className="hover:text-vayana-gold transition-colors">GI Tag Authenticity</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
