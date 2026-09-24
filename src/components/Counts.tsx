"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { BEAT_MS, phaseOffset } from "@/lib/beat";

/** An eight-count that lights on the beat, in time with the viewfinder groove. */
export default function Counts() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    ref.current?.style.setProperty("--bar-offset", phaseOffset(BEAT_MS * 8));
  }, []);

  return (
    <p ref={ref} aria-hidden className="counts flex gap-3 font-mono text-sm">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
        <span key={n} style={{ "--i": i } as CSSProperties}>
          {n}
        </span>
      ))}
    </p>
  );
}
