"use client";

import { useEffect, useRef, useState } from "react";
import { photographs, type Photograph } from "@/data/photos";
import { BEAT_MS } from "@/lib/beat";

/**
 * The landing page's background: two faint strips of the kept frames drifting
 * in opposite directions, like a contact sheet sliding under a loupe. Every
 * bar (four beats) a quiet detection box settles on one frame in view. It's
 * deliberately ink, not signal red, so the viewfinder stays the subject.
 */

const SWAP_MS = BEAT_MS * 4;
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

// If the page can't hold this frame rate once the opening has settled, the
// device drops to "lite": strips hold still (see .lite in globals.css). It
// takes two slow readings, so one hiccup (an image decoding) doesn't count.
// The verdict lasts the session, and layout.tsx applies it before first paint.
const LITE_FPS = 40;
const PROBES_AT_MS = [2500, 6000];
const PROBE_FOR_MS = 1000;

const isLite = () => document.documentElement.classList.contains("lite");

export default function ContactSheet() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only animate while the hero is on screen and the tab is visible.
    let inView = true;
    const running = () => inView && !document.hidden && !isLite();
    const sync = () => root.classList.toggle("is-paused", !running());
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);

    // Only frames fully on screen (and clear of the faded edges) qualify.
    const pick = () => {
      if (!running()) return;
      const w = window.innerWidth;
      const visible = [
        ...root.querySelectorAll<HTMLElement>("[data-sheet-id]"),
      ].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.left > w * 0.12 && r.right < w * 0.88;
      });
      setActive((prev) => {
        const options = visible.filter((el) => el.dataset.sheetId !== prev);
        if (!options.length) return null;
        return options[Math.floor(Math.random() * options.length)].dataset.sheetId!;
      });
    };

    let raf = 0;
    let slow = 0;
    const probe = () => {
      if (!running()) return;
      let frames = 0;
      const start = performance.now();
      const tick = (now: number) => {
        frames++;
        if (now - start < PROBE_FOR_MS) {
          raf = requestAnimationFrame(tick);
        } else if ((frames * 1000) / (now - start) < LITE_FPS && ++slow === PROBES_AT_MS.length) {
          document.documentElement.classList.add("lite");
          setActive(null);
          sync();
          try {
            sessionStorage.setItem("lite", "1");
          } catch {}
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const first = window.setTimeout(pick, 1200);
    const loop = window.setInterval(pick, SWAP_MS);
    const probeTimers = PROBES_AT_MS.map((ms) => window.setTimeout(probe, ms));
    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
      probeTimers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
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
              <Frame
                key={`${copy}-${photo.frame}`}
                id={`${r}-${copy}-${photo.frame}`}
                photo={photo}
                active={active === `${r}-${copy}-${photo.frame}`}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
}

function Frame({ id, photo, active }: { id: string; photo: Photograph; active: boolean }) {
  if (!photo.src) return null;
  const [x, y, w, h] = photo.detect?.box ?? [0, 0, 0, 0];

  return (
    <div data-sheet-id={photo.detect ? id : undefined} className="sheet-frame">
      {/* Natural size, so the detection box percentages line up with the photo. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny pre-sized thumbs on a static host */}
      <img src={thumb(photo.src)} alt="" decoding="async" />
      {photo.detect && (
        <div
          className={`sheet-box ${active ? "is-on" : ""}`}
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
