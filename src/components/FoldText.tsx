"use client";

import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Text that unfolds into place, a piece at a time, from a hinge. Inherits the
 * surrounding type; the pieces start hidden in CSS (see .fold-text in
 * globals.css) so nothing flashes before hydration. Screen readers get the
 * plain string.
 */

type SplitBy = "char" | "word";
type Hinge = "top" | "bottom";

const HINGES: Record<Hinge, { origin: string; rotateX: number }> = {
  top: { origin: "50% 0%", rotateX: -92 },
  bottom: { origin: "50% 100%", rotateX: 92 },
};

export default function FoldText({
  text,
  splitBy = "char",
  hinge = "bottom",
  trigger = "mount",
  delay = 0,
  duration = 0.8,
  stagger = 0.045,
  ease = "power3.out",
  className = "",
}: {
  text: string;
  splitBy?: SplitBy;
  hinge?: Hinge;
  /** "mount" plays on load; "scroll" plays once the text nears the viewport. */
  trigger?: "mount" | "scroll";
  /** Seconds; lets the hero sequence this against its other pieces. */
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const { origin, rotateX } = HINGES[hinge];

  const pieces = useMemo(() => {
    const piece = (content: string, key: string): ReactNode => (
      <span key={key} className="fold-text-segment">
        <span className="fold-text-piece" style={{ transformOrigin: origin } as CSSProperties}>
          {content}
        </span>
      </span>
    );
    if (splitBy === "word") {
      return text
        .split(/(\s+)/)
        .map((part, i) => (/^\s+$/.test(part) ? part : part && piece(part, `w${i}`)));
    }
    return Array.from(text).map((char, i) => (char === " " ? " " : piece(char, `c${i}`)));
  }, [text, splitBy, origin]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>(".fold-text-piece");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, rotateX },
      {
        opacity: 1,
        rotateX: 0,
        delay,
        duration,
        stagger,
        ease,
        paused: trigger === "scroll",
        clearProps: "transform,willChange",
      }
    );
    const st =
      trigger === "scroll"
        ? ScrollTrigger.create({
            trigger: root,
            start: "top 88%",
            // Anything already scrolled past (an anchor link, a reload) still plays.
            end: "max",
            once: true,
            onEnter: () => tween.play(),
          })
        : undefined;

    return () => {
      st?.kill();
      tween.kill();
    };
  }, [rotateX, trigger, delay, duration, stagger, ease]);

  return (
    <span ref={rootRef} className={`fold-text ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{pieces}</span>
    </span>
  );
}
