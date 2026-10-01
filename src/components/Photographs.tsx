import { photographs } from "@/data/photos";
import Photo from "./Photo";
import SectionHeader from "./SectionHeader";

// Deliberately uneven, like prints laid out on a table. One entry per photo.
// On wider screens the rows run 3 · 3 · 2 · 1: a large print with two smaller
// ones, a strip of three tall frames, a staggered pair, then one closing frame.
const LAYOUT = [
  // Row 1
  "col-span-10 sm:col-span-5 sm:col-start-1",
  "col-span-8 col-start-5 sm:col-span-3 sm:col-start-7 sm:mt-32",
  "col-span-8 sm:col-span-3 sm:col-start-10 sm:mt-56",
  // Row 2: the three 9:16 frames
  "col-span-6 sm:col-span-3 sm:col-start-2",
  "col-span-6 mt-16 sm:col-span-3 sm:col-start-6 sm:mt-20",
  "col-span-7 col-start-4 sm:col-span-3 sm:col-start-10 sm:mt-8",
  // Row 3
  "col-span-10 col-start-3 sm:col-span-5 sm:col-start-2",
  "col-span-8 sm:col-span-4 sm:col-start-8 sm:mt-28",
  // Row 4
  "col-span-8 col-start-3 sm:col-span-4 sm:col-start-5",
];

export default function Photographs() {
  return (
    <section id="photographs" className="wrap py-12 sm:py-16">
      <SectionHeader index="04" kicker="Photographs" title="Kept frames" />

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 sm:gap-y-12">
        {photographs.map((photo, i) => (
          <Photo
            key={photo.frame}
            className={LAYOUT[i % LAYOUT.length]}
            src={photo.src}
            alt={photo.alt}
            ratio={photo.ratio}
            note={`Frame ${photo.frame}`}
            caption={`${photo.frame} — ${photo.caption}`}
            frame={`frame ${photo.frame}`}
            sizes="(min-width: 640px) 40vw, 80vw"
          />
        ))}
      </div>
    </section>
  );
}
