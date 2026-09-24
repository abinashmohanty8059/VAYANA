import Image from "next/image";

export default function EditorialBanner() {
  return (
    <section
      className="relative min-h-[550px] flex items-center justify-center bg-vayana-charcoal overflow-hidden"
      aria-label="Cinematic editorial banner"
    >
      {/* Background Image */}
      <Image
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC4E8uceW9-3fAzWIds4SCn-1TTzTCZQ-swWs6OSgbxQ8b_eLLVcz5q60YVzZxGMVFRtfFnDXQlHGtYa5UPgk9B6tKns2QSkvPc6VP3s4oxNX85jbDsJmSCZ6aRAkeqbuFs3B3L3CQWRKu_cbbvV65QQmbjJOBmyr9iaiQUE8DCJ2pWOxOAR-g7I0ewdTwgchav5x71tOF3q4Q4j5Vw3Yt3kKYYG9JA7O4wSCH-Jmc1gtqqRlFnDic"
        alt="Kalinga Heritage Editorial Banner"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
        priority={false}
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-vayana-charcoal via-vayana-charcoal/60 to-vayana-charcoal" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
        <span className="text-xs uppercase tracking-widest-luxury text-vayana-lightGold font-semibold">
          ODISHA • SACRED WEAVES
        </span>
        <h2 className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl text-vayana-cream uppercase font-light mt-4 tracking-tight">
          &ldquo;EVERY THREAD CARRIES A PRAYER.&rdquo;
        </h2>
        <p className="font-editorial-serif text-lg sm:text-xl text-vayana-sand/90 italic mt-6 max-w-2xl mx-auto font-light">
          A symphony of Kalinga architecture, divine mathematics, and handwoven luxury built to be cherished across
          lifetimes.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <a
            href="#collection"
            className="px-8 py-3.5 bg-vayana-gold text-vayana-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-vayana-lightGold transition-all duration-300"
          >
            EXPLORE THE KALINGA EDIT
          </a>
          <a
            href="#story"
            className="px-8 py-3.5 border border-vayana-cream/60 text-vayana-cream text-xs uppercase tracking-widest font-medium hover:bg-vayana-cream hover:text-vayana-charcoal transition-all duration-300"
          >
            READ FOUNDERS' NOTE
          </a>
        </div>
      </div>
    </section>
  );
}
