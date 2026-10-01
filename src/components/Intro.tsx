import Photo from "./Photo";

export default function Intro() {
  return (
    <section
      id="top"
      className="wrap grid grid-cols-12 items-end gap-x-6 pt-12 pb-8 sm:pt-16"
    >
      <div className="col-span-12 flex flex-col justify-end lg:col-span-7">
        <p className="eyebrow text-muted">Ann Arbor, Michigan</p>
        <h1 className="mt-6 font-serif text-[clamp(4.5rem,13vw,10.5rem)] leading-[0.85] tracking-[-0.02em]">
          Darrin Du
        </h1>
        <p className="mt-6 max-w-[24ch] font-serif text-3xl leading-tight text-balance text-muted italic sm:text-4xl">
          studies how machines see, and how people move.
        </p>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80">
          Computer science student at the University of Michigan, working in
          computer vision. Away from the desk I dance hip-hop and carry a
          camera most places I go.
        </p>
      </div>

      <Photo
        className="col-span-10 col-start-2 mt-10 sm:col-span-6 sm:col-start-6 lg:col-span-5 lg:col-start-8 lg:mt-0"
        src="/photos/headshot.jpg"
        ratio="1/1"
        alt="Portrait of Darrin Du"
        note="Portrait"
        caption="Fig. 1 — Self"
        frame="person · 0.99"
        sizes="(min-width: 1024px) 40vw, 80vw"
      />
    </section>
  );
}
