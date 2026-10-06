"use client";

import { useEffect } from "react";

/**
 * Marks each `[data-reveal]` element `.is-in` as it nears the viewport, which
 * fades it up (CSS, in globals.css). Ones arriving together are staggered.
 * Renders nothing; mount it once per page.
 */

const STAGGER_MS = 120;

export default function Reveals() {
  useEffect(() => {
    const remeasure = () => window.dispatchEvent(new Event("viewfinder:remeasure"));

    const observer = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          // Below the fold: wait. Already scrolled past (an anchor link, a
          // reload): show it now, with no stagger.
          if (!isIntersecting && boundingClientRect.top > 0) continue;
          const el = target as HTMLElement;
          el.style.setProperty("--d", `${isIntersecting ? n++ * STAGGER_MS : 0}ms`);
          el.classList.add("is-in");
          // The viewfinder may have locked on mid-slide; let it re-measure.
          el.addEventListener("transitionend", remeasure, { once: true });
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
