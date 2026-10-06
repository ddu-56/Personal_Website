import type { CSSProperties } from "react";

/**
 * Text that unfolds into place a piece at a time, hinged at the baseline.
 * Pure CSS (see .fold-text in globals.css): the pieces play once an ancestor
 * gets `.intro-in` (the hero, Hero.tsx) or `.is-in` (a scroll reveal,
 * Reveals.tsx). Screen readers get the plain string.
 */
export default function FoldText({
  text,
  splitBy = "char",
  delay = 0,
  stagger = 45,
}: {
  text: string;
  splitBy?: "char" | "word";
  /** Milliseconds after the trigger before the first piece moves. */
  delay?: number;
  /** Milliseconds between pieces. */
  stagger?: number;
}) {
  let i = 0;
  const parts = splitBy === "word" ? text.split(/(\s+)/) : Array.from(text);

  return (
    <span
      className="fold-text"
      style={{ "--fold-delay": `${delay}ms`, "--fold-stagger": `${stagger}ms` } as CSSProperties}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="fold-text-visual">
        {parts.map((part, key) =>
          !part || /^\s+$/.test(part) ? (
            part
          ) : (
            <span key={key} className="fold-text-piece" style={{ "--i": i++ } as CSSProperties}>
              {part}
            </span>
          )
        )}
      </span>
    </span>
  );
}
