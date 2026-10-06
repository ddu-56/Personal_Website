import Counts from "./Counts";
import Photo from "./Photo";
import SectionHeader from "./SectionHeader";

export default function Dance() {
  return (
    <section id="dance" className="wrap section-y">
      <SectionHeader index="05" kicker="Dance" title="On the count" />

      <div className="mt-(--space-stack) grid grid-cols-12 gap-x-6">
        <Photo
          className="col-span-12 lg:col-span-7"
          src="/photos/dance-team.jpg"
          ratio="4/3"
          alt="Darrin and dance team posing on stage in matching jackets after a show"
          note="Dance — performance or practice"
          caption="Fig. 3 — Hip-hop"
          frame="dancer · 0.97"
          groove
          reveal
          sizes="(min-width: 1024px) 58vw, 100vw"
        />

        <div data-reveal className="col-span-12 mt-12 flex flex-col justify-center gap-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <Counts />
          <div>
            <p className="font-serif text-3xl leading-snug">
              Hip-hop taught me a lot about growth: ask for help when you need
              it, and when things still don’t click, keep showing up.
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
