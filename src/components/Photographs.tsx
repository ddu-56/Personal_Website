import type { CSSProperties } from "react";
import { photographs } from "@/data/photos";
import Photo from "./Photo";
import SectionHeader from "./SectionHeader";

// Laid out like a contact sheet: rows of prints that share one height and
// together fill the width exactly (see .contact-prints in globals.css). Each
// print's width follows its aspect ratio, so nothing is cropped to fit a grid.
//
// On wide screens the rows are fixed, by frame number, and balanced so both
// come out about the same height: five tall frames, then four wider ones.
// Narrower screens ignore the split and simply wrap. A photo added to
// photos.ts but not listed here joins the last row rather than going missing.
const ROWS = [
  ["04A", "15", "11A", "22A", "31"],
  ["07", "38A", "36", "40"],
];

const listed = new Set(ROWS.flat());
const rows = ROWS.map((row, r) => [
  ...row.flatMap((frame) => photographs.filter((p) => p.frame === frame)),
  ...(r === ROWS.length - 1
    ? photographs.filter((p) => !listed.has(p.frame))
    : []),
]);

const ratioOf = (ratio: string) => {
  const [w, h] = ratio.split("/").map(Number);
  return w / h;
};

export default function Photographs() {
  return (
    <section id="photographs" className="wrap section-y">
      <SectionHeader index="04" kicker="Photographs" title="Kept frames" />

      {/* Wide screens: the sheet is centered on the page and capped in width,
          so the prints stay the same size however wide the window gets. */}
      <div className="mt-(--space-stack)">
        <div className="contact-prints mx-auto lg:max-w-[52rem]">
          {rows.map((row, r) => [
            r > 0 && (
              <span key={`break-${r}`} aria-hidden className="contact-break" />
            ),
            ...row.map((photo) => (
              <Photo
                key={photo.frame}
                className="contact-print"
                style={{ "--ar": ratioOf(photo.ratio) } as CSSProperties}
                src={photo.src}
                alt={photo.alt}
                ratio={photo.ratio}
                note={`Frame ${photo.frame}`}
                caption={`${photo.frame} — ${photo.caption}`}
                frame={`frame ${photo.frame}`}
                reveal
                sizes="(min-width: 1024px) 280px, 45vw"
              />
            )),
          ])}
        </div>
      </div>
    </section>
  );
}
