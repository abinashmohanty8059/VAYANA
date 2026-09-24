"use client";

import { useRef } from "react";

export default function FinalCTA() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Thank you for subscribing to Vayana Atelier Privé.");
    formRef.current?.reset();
  }

  return (
    <section
      className="py-24 bg-vayana-cream relative text-center overflow-hidden"
      aria-label="Newsletter VIP signup"
    >
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Motif Graphic Marker */}
        <div className="flex items-center justify-center space-x-3 text-vayana-gold mb-6" aria-hidden="true">
          <span>―</span>
          <span className="text-lg">✤</span>
          <span>―</span>
        </div>

        <h2 className="font-editorial-serif text-4xl sm:text-6xl text-vayana-charcoal uppercase font-normal tracking-tight">
          WEAR YOUR HERITAGE.
        </h2>
        <p className="font-editorial-serif text-lg text-vayana-charcoal/80 italic mt-3 max-w-xl mx-auto font-light">
          Discover textiles shaped by ancient temple traditions, crafted entirely by hand, and designed for timeless
          grace.
        </p>

        {/* VIP Newsletter Form */}
        <form
          ref={formRef}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-3"
          onSubmit={handleSubmit}
          aria-label="Subscribe to Vayana Atelier newsletter"
        >
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            id="email-input"
            className="w-full px-5 py-3.5 text-xs bg-vayana-parchment border border-vayana-gold/50 focus:border-vayana-maroon focus:ring-1 focus:ring-vayana-maroon tracking-wider font-sans outline-none placeholder:text-vayana-charcoal/40"
            placeholder="Enter your email for private salon drops..."
            required
            type="email"
            autoComplete="email"
          />
          <button
            className="w-full sm:w-auto px-8 py-3.5 bg-vayana-maroon text-vayana-cream text-xs uppercase tracking-widest font-medium hover:bg-vayana-crimson transition-colors whitespace-nowrap shadow-md"
            type="submit"
          >
            JOIN ATELIER
          </button>
        </form>

        <span className="text-[10px] text-vayana-charcoal/50 uppercase tracking-widest mt-4 block">
          Strictly Curated. No Spam. Only Heirloom Releases.
        </span>
      </div>
    </section>
  );
}
