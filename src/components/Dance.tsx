import Counts from "./Counts";
import Photo from "./Photo";
import SectionHeader from "./SectionHeader";

export default function Dance() {
  return (
    <section id="dance" className="wrap py-24 sm:py-32">
      <SectionHeader index="04" kicker="Dance" title="On the count" />

      <div className="mt-16 grid grid-cols-12 gap-x-6">
        <Photo
          className="col-span-12 lg:col-span-7"
          ratio="4/5"
          alt="Darrin dancing"
          note="Dance — performance or practice"
          caption="Fig. 2 — Hip-hop"
          frame="dancer · 0.97"
          groove
          sizes="(min-width: 1024px) 58vw, 100vw"
        />

        <div className="col-span-12 mt-12 flex flex-col justify-between gap-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <Counts />
          <div>
            <p className="font-serif text-3xl leading-snug">
              Hip-hop taught me most of what I know about practice: drill the
              eight-count until you stop thinking about it, then find somewhere
              to play.
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/80">
              I dance hip-hop choreography in classes, practice rooms, and on
              stage when I get the chance. It’s the counterweight to sitting at
              a desk, and it’s where a lot of my ideas show up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
