"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#roots", label: "Heritage" },
  { href: "#collection", label: "The Collection" },
  { href: "#craft", label: "Weaving Craft" },
  { href: "#motifs", label: "Signature Motifs" },
  { href: "#story", label: "Our Story" },
  { href: "#pillars", label: "Pillars" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Expose cart updater globally for product cards
  useEffect(() => {
    (window as any).__vayanaAddToCart = () => setCartCount((c) => c + 1);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-vayana-charcoal text-vayana-cream text-[10px] md:text-xs tracking-mega-luxury uppercase py-2.5 px-4 text-center border-b border-vayana-gold/30 relative z-50">
        <div className="container mx-auto flex items-center justify-center gap-3">
          <span className="text-vayana-gold text-xs">◆</span>
          <span>Complimentary Worldwide White-Glove Shipping on Handcrafted Masterpieces</span>
          <span className="hidden md:inline text-vayana-gold text-xs">◆</span>
          <span className="hidden md:inline">Handwoven with Sacred Reverence in Odisha</span>
          <span className="text-vayana-gold text-xs">◆</span>
        </div>
      </div>

      {/* Sticky Navigation */}
      <header
        ref={navRef}
        className={`luxury-blur-nav sticky top-0 z-40 bg-vayana-cream/90 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "scrolled" : ""
        }`}
        id="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Vayana Textiles Home">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC--zncsbC296igk6MvBxgIay6eIbqTZv8-dLxT4u-bh3L-WcwkUz6AAP8wOmlwUAXUQiAn_SWVrMHZY6PveSmI06QUogiwCl7HO7ALne5ARS9lmgxce-Obo58UctvG97YyIDNojjxg4fMD6tx0GK_1D82MZr5L6GRbydNlbTtQRLGTsUXcIThney_w8ISy9YrtrWicezNLI01lOjvqZ418OIAQ3v-dnE1JN6NIHQZFvGcZfXRXpH_NH1F2VBFD36WKYw"
              alt="Vayana Logo - Wear Your Heritage"
              width={56}
              height={56}
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="flex flex-col">
              <span className="font-luxury-display text-lg md:text-xl tracking-widest text-vayana-charcoal font-bold group-hover:text-vayana-maroon transition-colors">
                VAYANA
              </span>
              <span className="text-[8px] uppercase tracking-mega-luxury text-vayana-maroon font-medium">
                Wear Your Heritage
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-8 text-[11px] font-medium tracking-heritage text-vayana-charcoal/80 uppercase"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="hover:text-vayana-maroon hover:border-b hover:border-vayana-gold py-1 transition-all"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right Utility Actions */}
          <div className="flex items-center space-x-5 text-vayana-charcoal text-xs tracking-wider">
            <button
              className="hidden sm:inline-block text-[11px] uppercase tracking-widest font-medium text-vayana-charcoal/70 hover:text-vayana-maroon transition-colors"
              type="button"
              aria-label="Currency selector"
            >
              INR (₹) / USD ($)
            </button>

            <button
              aria-label="Search Collection"
              className="p-1.5 text-vayana-charcoal hover:text-vayana-maroon transition-colors"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              aria-label="Saved Pieces"
              className="hidden sm:inline-block p-1.5 text-vayana-charcoal hover:text-vayana-maroon transition-colors"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              aria-label="View Shopping Bag"
              className="flex items-center gap-1.5 p-1.5 text-vayana-charcoal hover:text-vayana-maroon transition-colors font-medium"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] tracking-normal font-sans font-semibold text-vayana-maroon">
                ({cartCount})
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              className="lg:hidden p-1.5 text-vayana-charcoal hover:text-vayana-maroon"
              onClick={() => setMobileOpen((o) => !o)}
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-vayana-cream border-b border-vayana-gold/30 px-6 py-6">
            <nav className="flex flex-col space-y-4 text-xs uppercase tracking-widest text-vayana-charcoal" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ href, label }, i) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`hover:text-vayana-maroon py-1 transition-colors ${
                    i < NAV_LINKS.length - 1 ? "border-b border-vayana-borderMuted" : ""
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
