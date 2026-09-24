import { photographs } from "@/data/photos";
import Photo from "./Photo";
import SectionHeader from "./SectionHeader";

// Deliberately uneven, like prints laid out on a table. One entry per photo.
const LAYOUT = [
  "col-span-12 sm:col-span-5",
  "col-span-12 sm:col-span-6 sm:col-start-7 sm:mt-40",
  "col-span-12 sm:col-span-7 sm:col-start-2",
  "col-span-8 col-start-5 sm:col-span-3 sm:col-start-10 sm:mt-48",
  "col-span-10 sm:col-span-4 sm:col-start-3",
  "col-span-12 sm:col-span-4 sm:col-start-8 sm:mt-24",
];

export default function Photographs() {
  return (
    <section id="photographs" className="wrap py-24 sm:py-32">
      <SectionHeader index="03" kicker="Photographs" title="Kept frames" />

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-16 sm:gap-y-24">
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
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ))}
      </div>
    </section>
  );
}
