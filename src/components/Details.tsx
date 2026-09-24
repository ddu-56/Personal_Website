"use client";

import { useId, useState, type ReactNode } from "react";
import Emphasis from "./Emphasis";

/**
 * Shows an entry's one-line summary, with its full bullet list folded away
 * behind a toggle. `children` renders beneath the toggle (stack, links).
 */
export default function Details({
  summary,
  bullets,
  children,
}: {
  summary: string;
  bullets: string[];
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <p className="text-[15px] leading-relaxed text-ink/80">
        <Emphasis text={summary} />
      </p>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div id={id} inert={!open} className="overflow-hidden">
          <ul className="space-y-3 pt-5 text-[15px] leading-relaxed text-ink/80">
            {bullets.map((bullet) => (
              <li key={bullet} className="relative pl-4">
                <span aria-hidden className="absolute left-0 text-signal">
                  –
                </span>
                <Emphasis text={bullet} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="eyebrow mt-5 text-[10px] text-signal transition-colors hover:text-ink"
      >
        {open ? "Less ↑" : `Details (${bullets.length}) ↓`}
      </button>

      {children}
    </>
  );
}
