"use client";

import { useEffect, useRef } from "react";
import { photographs, type Photograph } from "@/data/photos";
import { BEAT_MS } from "@/lib/beat";

/**
 * The landing page's background: two faint strips of the kept frames drifting
 * in opposite directions, like a contact sheet sliding under a loupe. Every
 * two bars a quiet detection box settles on one frame in view. It's
 * deliberately ink, not signal red, so the viewfinder stays the subject.
 *
 * Kept cheap: the drift is one CSS transform per strip (GPU, no JS per
 * frame), it pauses off screen and in background tabs, and the boxes are a
 * class flip on one element every few seconds, never a React re-render.
 */

const SWAP_MS = BEAT_MS * 8;
// Copies of the set per strip. Must be even (the loop shifts by half), and
// half must outrun a wide monitor: one set is only ~1000px at full height.
const COPIES = 6;

const rows = [
  { dir: "left", photos: photographs },
  { dir: "right", photos: [...photographs].reverse() },
] as const;

// Pre-sized gray copies from scripts/images.mjs.
const thumb = (src: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH}${src.replace(
    /\/photos\/([^/]+)\.jpe?g$/i,
    "/photos/_sized/thumbs/$1.webp"
  )}`;

export default function ContactSheet() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Weak or data-saving devices (flagged in layout.tsx) get still strips.
    if (document.documentElement.classList.contains("lite")) return;

    // Only animate while the hero is on screen and the tab is visible.
    let inView = true;
    const running = () => inView && !document.hidden;
    const sync = () => root.classList.toggle("is-paused", !running());
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);

    const frames = [...root.querySelectorAll<HTMLElement>(".sheet-frame.has-box")];
    let active: HTMLElement | null = null;

    // Move the box to a random frame fully on screen (clear of the faded edges).
    const pick = () => {
      if (!running()) return;
      const w = window.innerWidth;
      const options = frames.filter((el) => {
        if (el === active) return false;
        const r = el.getBoundingClientRect();
        return r.left > w * 0.14 && r.right < w * 0.86;
      });
      active?.classList.remove("is-on");
      active = options[Math.floor(Math.random() * options.length)] ?? null;
      active?.classList.add("is-on");
    };

    const first = window.setTimeout(pick, 1800);
    const loop = window.setInterval(pick, SWAP_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden data-intro="sheet" className="contact-sheet pointer-events-none absolute inset-0 -z-10">
      {rows.map((row, r) => (
        <div
          key={row.dir}
          className={`sheet-row sheet-${row.dir} ${r === 0 ? "sheet-top top-3" : "bottom-14"}`}
        >
          {/* Repeated copies, so translating by -50% loops seamlessly. */}
          {Array.from({ length: COPIES }, (_, copy) =>
            row.photos.map((photo) => (
              <Frame key={`${copy}-${photo.frame}`} photo={photo} />
            ))
          )}
        </div>
      ))}
    </div>
  );
}

function Frame({ photo }: { photo: Photograph }) {
  if (!photo.src) return null;
  const [x, y, w, h] = photo.detect?.box ?? [0, 0, 0, 0];

  return (
    <div className={photo.detect ? "sheet-frame has-box" : "sheet-frame"}>
      {/* Natural size, so the detection box percentages line up with the photo. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny pre-sized thumbs on a static host */}
      <img src={thumb(photo.src)} alt="" decoding="async" />
      {photo.detect && (
        <div
          className="sheet-box"
          style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
        >
          <span>
            {photo.detect.label} · {photo.detect.score.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
