import Photo from "./Photo";

export default function Intro() {
  return (
    <section
      id="top"
      className="wrap grid grid-cols-12 gap-x-6 pt-20 pb-28 sm:pt-28 lg:pb-40"
    >
      <div className="col-span-12 flex flex-col justify-end lg:col-span-7">
        <p className="eyebrow text-muted">Ann Arbor, Michigan</p>
        <h1 className="mt-8 font-serif text-[clamp(4.5rem,13vw,10.5rem)] leading-[0.85] tracking-[-0.02em]">
          Darrin Du
        </h1>
        <p className="mt-6 max-w-[24ch] font-serif text-3xl leading-tight text-balance text-muted italic sm:text-4xl">
          studies how machines see, and how people move.
        </p>
        <p className="mt-10 max-w-md text-base leading-relaxed text-ink/80">
          Computer science student at the University of Michigan, working in
          computer vision. Away from the desk I dance hip-hop and carry a
          camera most places I go.
        </p>
      </div>

      <Photo
        className="col-span-10 col-start-2 mt-16 sm:col-span-6 sm:col-start-6 lg:col-span-4 lg:col-start-9 lg:mt-24"
        src="/photos/headshot.jpg"
        ratio="4/5"
        alt="Portrait of Darrin Du"
        note="Portrait"
        caption="Fig. 1 — Self"
        frame="person · 0.99"
        sizes="(min-width: 1024px) 33vw, 80vw"
      />
    </section>
  );
}
