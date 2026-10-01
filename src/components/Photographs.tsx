import { photographs } from "@/data/photos";
import Photo from "./Photo";
import SectionHeader from "./SectionHeader";

// Deliberately uneven, like prints laid out on a table. One entry per photo.
const LAYOUT = [
  "col-span-9 sm:col-span-4 sm:col-start-2",
  "col-span-9 col-start-4 sm:col-span-4 sm:col-start-7 sm:mt-16",
  "col-span-10 sm:col-span-5 sm:col-start-2",
  "col-span-7 col-start-6 sm:col-span-3 sm:col-start-8 sm:mt-20",
  "col-span-7 sm:col-span-3 sm:col-start-3",
  "col-span-7 col-start-6 sm:col-span-3 sm:col-start-7 sm:mt-10",
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
