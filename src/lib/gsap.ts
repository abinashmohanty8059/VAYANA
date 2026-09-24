"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip, CustomEase, useGSAP);
  CustomEase.create("luxe", "0.19, 1, 0.22, 1");
  CustomEase.create("silk", "0.65, 0, 0.35, 1");
  gsap.defaults({ ease: "luxe", duration: 1.2 });
}

/**
 * Phones, small screens and touch devices: heavy continuous or scroll-scrubbed
 * effects are switched off or frozen here to keep scrolling smooth.
 */
export const LITE_QUERY = "(max-width: 767px), (pointer: coarse)";

/** Fired on window once the preloader curtain has lifted. */
export const LOADED_EVENT = "vayana:loaded";

export function onSiteLoaded(cb: () => void) {
  if (document.documentElement.dataset.loaded === "1") {
    cb();
    return () => {};
  }
  window.addEventListener(LOADED_EVENT, cb, { once: true });
  return () => window.removeEventListener(LOADED_EVENT, cb);
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip, useGSAP };
