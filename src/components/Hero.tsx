"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/**
 * Wraps the first screen (masthead + intro) and plays its opening, a camera
 * coming up: the strips surface, the nav and copy settle in, the portrait
 * opens like a shutter, and the viewfinder (held wide until then) locks on.
 *
 * Pieces opt in with `data-intro="<cue>"` and start hidden in CSS. The name
 * and tagline are FoldText, which times itself with a `delay` against this.
 */

// Seconds from load. Name folds in at 0.3, tagline at 0.75 (see Intro.tsx).
const CUES: Record<string, number> = {
  sheet: 0,
  nav: 0.1,
  eyebrow: 0.2,
  photo: 0.35,
  body: 1.0,
  hint: 1.5,
};

export default function Hero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const all = root.querySelectorAll<HTMLElement>("[data-intro]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(all, { opacity: 1 });
      return;
    }

    const cue = (name: string) =>
      root.querySelectorAll<HTMLElement>(`[data-intro="${name}"]`);
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(cue("sheet"), { opacity: 1, duration: 1.6, ease: "power1.out" }, CUES.sheet);
    for (const name of ["nav", "eyebrow", "body", "hint"]) {
      tl.fromTo(
        cue(name),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, clearProps: "transform" },
        CUES[name]
      );
    }

    // The portrait opens from a horizontal slit while the image settles.
    const photo = cue("photo");
    tl.fromTo(
      photo,
      { opacity: 1, clipPath: "inset(50% 0% 50% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut", clearProps: "clipPath" },
      CUES.photo
    ).fromTo(
      [...photo].flatMap((el) => [...el.querySelectorAll("img")]),
      { scale: 1.15 },
      { scale: 1, duration: 1.6, ease: "power3.out", clearProps: "transform" },
      CUES.photo
    );

    return () => {
      tl.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
