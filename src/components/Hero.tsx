"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps the first screen (masthead + intro) and starts its opening, a camera
 * coming up: the strips surface, the nav and copy settle in, the portrait
 * opens like a shutter, and the viewfinder (held wide until then) locks on.
 *
 * The motion itself is CSS (the "Entrances" block in globals.css), keyed off
 * `.intro-in` on this wrapper and each piece's `data-intro` cue. This only
 * decides when to start: once the portrait has decoded and the fonts are in,
 * so the shutter opens on a real photo and the name never re-flows mid-fold.
 */

// Don't hold the opening longer than this waiting on the photo and fonts.
const MAX_WAIT_MS = 800;
// When the shutter is fully open (its delay + duration in globals.css).
const SHUTTER_OPEN_MS = 1450;

export default function Hero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // Tells the inline failsafe in layout.tsx that motion is in hand.
    document.documentElement.classList.add("motion-ready");

    const photo = root.querySelector<HTMLImageElement>('[data-intro="photo"] img');
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let lock = 0;

    Promise.race([
      Promise.all([document.fonts?.ready, photo?.decode().catch(() => {})]),
      new Promise((r) => setTimeout(r, MAX_WAIT_MS)),
    ]).then(() => {
      if (cancelled) return;
      root.classList.add("intro-in");
      lock = window.setTimeout(
        () => window.dispatchEvent(new Event("viewfinder:start")),
        reduced ? 0 : SHUTTER_OPEN_MS
      );
    });

    return () => {
      cancelled = true;
      window.clearTimeout(lock);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
