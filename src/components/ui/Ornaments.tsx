import { useId } from "react";

/** Lotus-over-loom monogram used as the brand mark. */
export function LotusMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M24 8c-3.4 5-5.5 9.6-5.5 14.2 0 4.6 2.5 8 5.5 8s5.5-3.4 5.5-8C29.5 17.6 27.4 13 24 8z" />
      <path d="M16.5 15.5c-3.6 3.8-5 8.4-3.6 11.8 1.4 3.4 5.4 4.3 10 3" />
      <path d="M31.5 15.5c3.6 3.8 5 8.4 3.6 11.8-1.4 3.4-5.4 4.3-10 3" />
      <path d="M8 26c3 4.6 8.8 6.4 16 4.6 7.2 1.8 13-0 16-4.6" />
      <path d="M10 36h28M13 40h22" />
      <path d="M24 30.6V44" strokeDasharray="1.5 2" />
    </svg>
  );
}

/** Circular inscription that spins on its own and can be scroll-scrubbed via data-spin. */
export function RotatingSeal({
  text = "HANDWOVEN IN ODISHA · SINCE 1948 · WEAR YOUR HERITAGE · ",
  className = "w-32 h-32",
  ringClass = "text-gold",
  children,
}: {
  text?: string;
  className?: string;
  ringClass?: string;
  children?: React.ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={`absolute inset-0 w-full h-full animate-spin-slow ${ringClass}`}>
        <defs>
          <path id={`seal-${id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        <text fill="currentColor" fontSize="13" letterSpacing="4.6" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
          <textPath href={`#seal-${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/** Text that rolls up to a duplicate on hover — used on nav and footer links. */
export function RollText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="block transition-transform duration-700 ease-luxe group-hover:-translate-y-full">{children}</span>
      <span
        className="absolute inset-0 block translate-y-full transition-transform duration-700 ease-luxe group-hover:translate-y-0"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}

export function SectionLabel({
  index,
  children,
  className = "text-maroon",
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 eyebrow ${className}`} data-reveal="left">
      <span className="font-display italic normal-case tracking-normal text-base">{index}</span>
      <span className="h-px w-10 bg-current opacity-50" />
      <span>{children}</span>
    </div>
  );
}

export function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Kumbha temple-spire border, drawn as a repeating SVG strip. */
export function KumbhaBorder({ className = "text-gold" }: { className?: string }) {
  const id = `kumbha-${useId().replace(/:/g, "")}`;
  return (
    <div className={`h-6 w-full ${className}`} aria-hidden="true">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="28" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 23 L14 3 L28 23" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <path d="M7 23 L14 12 L21 23" fill="currentColor" opacity="0.35" />
            <circle cx="14" cy="3" r="1.3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <line x1="0" y1="23.5" x2="100%" y2="23.5" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
