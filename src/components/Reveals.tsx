"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades every `[data-reveal]` element up into place as it nears the viewport,
 * staggering ones that arrive together. They start hidden in CSS so nothing
 * flashes before this runs. Renders nothing; mount it once per page.
 */
export default function Reveals() {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(els, { opacity: 1 });
      return;
    }

    gsap.set(els, { y: 18 });
    const triggers = ScrollTrigger.batch(els, {
      start: "top 90%",
      // Anything already scrolled past (an anchor link, a reload) still plays.
      end: "max",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform",
          // The viewfinder may have locked on mid-slide; let it re-measure.
          onComplete: () => window.dispatchEvent(new Event("viewfinder:remeasure")),
        }),
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
