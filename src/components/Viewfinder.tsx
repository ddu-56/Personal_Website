"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BEAT_MS, phaseOffset } from "@/lib/beat";

/**
 * The site's one moving part: a set of corner brackets that travels the page
 * and locks onto whichever `[data-frame]` element sits at the focus line.
 * Reads as a camera's AF frame and as a detection box — the label is the
 * element's `data-frame` value. Add `data-frame-groove` to make the brackets
 * bounce on the beat while locked.
 */

type Box = { x: number; y: number; w: number; h: number };

const PAD = 10; // breathing room between subject and brackets
const ARM = 14; // bracket arm length, matches .vf-corner size
const INTRO_MS = 500; // brackets hold the full viewport this long on load
const FOCUS_LINE = 0.45; // fraction of viewport height the frame hunts for

const CORNERS = [
  { id: "tl", fx: 0, fy: 0, stagger: 0 },
  { id: "tr", fx: 1, fy: 0, stagger: 40 },
  { id: "br", fx: 1, fy: 1, stagger: 80 },
  { id: "bl", fx: 0, fy: 1, stagger: 120 },
] as const;

export default function Viewfinder() {
  const layerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLElement | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [lock, setLock] = useState(0);
  const [grooveDelay, setGrooveDelay] = useState<string | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let ready = false;
    let raf = 0;

    // Boxes live in the layer's coordinates, so they scroll with the page and
    // only animate when the subject changes.
    const measure = (el: HTMLElement): Box => {
      const l = layer.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return {
        x: r.left - l.left - PAD,
        y: r.top - l.top - PAD,
        w: r.width + PAD * 2,
        h: r.height + PAD * 2,
      };
    };

    const viewportBox = (): Box => {
      const l = layer.getBoundingClientRect();
      const inset = 24;
      return {
        x: inset - l.left,
        y: inset - l.top,
        w: document.documentElement.clientWidth - inset * 2,
        h: window.innerHeight - inset * 2,
      };
    };

    const lockOn = (el: HTMLElement) => {
      activeRef.current = el;
      setBox(measure(el));
      setLabel(el.dataset.frame ?? null);
      setLock((n) => n + 1);
      setGrooveDelay(
        el.dataset.frameGroove !== undefined ? phaseOffset(BEAT_MS) : null
      );
    };

    const pick = () => {
      if (!ready) return;
      const focus = window.innerHeight * FOCUS_LINE;
      const covers = (r: DOMRect) => r.top <= focus && r.bottom >= focus;

      // Stay on the current subject while it still covers the focus line.
      const current = activeRef.current;
      if (current && covers(current.getBoundingClientRect())) return;

      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const el of document.querySelectorAll<HTMLElement>("[data-frame]")) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const dist = covers(r)
          ? 0
          : Math.min(Math.abs(r.top - focus), Math.abs(r.bottom - focus));
        if (dist < bestDist) {
          best = el;
          bestDist = dist;
        }
      }
      if (best && best !== current) lockOn(best);
    };

    const schedulePick = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pick();
      });
    };

    const remeasure = () => {
      if (activeRef.current) setBox(measure(activeRef.current));
      schedulePick();
    };

    // Open wide on the whole viewport, then snap onto the first subject.
    const openRaf = requestAnimationFrame(() => setBox(viewportBox()));
    const intro = window.setTimeout(() => {
      ready = true;
      pick();
    }, INTRO_MS);

    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", schedulePick, { passive: true });
    window.addEventListener("resize", schedulePick);

    return () => {
      cancelAnimationFrame(openRaf);
      cancelAnimationFrame(raf);
      window.clearTimeout(intro);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedulePick);
      window.removeEventListener("resize", schedulePick);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-30 ${
        grooveDelay !== null ? "is-grooving" : ""
      }`}
      style={{ "--groove-delay": grooveDelay ?? "0ms" } as CSSProperties}
    >
      {box &&
        CORNERS.map(({ id, fx, fy, stagger }) => (
          <div
            key={id}
            className={`vf-corner vf-${id}`}
            style={
              {
                transform: `translate3d(${box.x + fx * (box.w - ARM)}px, ${
                  box.y + fy * (box.h - ARM)
                }px, 0)`,
                transitionDelay: `${stagger}ms`,
                "--stagger": `${stagger}ms`,
              } as CSSProperties
            }
          >
            {/* Remounting on each lock replays the arrival hit. */}
            <span key={lock} />
          </div>
        ))}
      {box && label && (
        <div
          className="vf-label"
          style={{ transform: `translate3d(${box.x}px, ${box.y - 18}px, 0)` }}
        >
          <span key={lock}>{label}</span>
        </div>
      )}
    </div>
  );
}
