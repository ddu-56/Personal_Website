import { RESUME_URL } from "./Masthead";
import Photo from "./Photo";

export default function Intro() {
  return (
    // Fills the first screen (minus the masthead); text left, photo right,
    // kept to roughly 60% of the width and centred.
    <section
      id="top"
      className="wrap relative flex min-h-[calc(100svh-3rem)] items-center py-16"
    >
      <div className="mx-auto grid w-full max-w-4xl grid-cols-12 items-center gap-x-10 gap-y-10">
        <div className="col-span-12 sm:col-span-7">
          <p className="eyebrow text-muted">
            Computer Science · University of Michigan
          </p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,min(8vw,10svh),6.5rem)] leading-[0.9] tracking-[-0.02em]">
            Darrin Du
          </h1>
          <p className="mt-4 max-w-[24ch] font-serif text-2xl leading-tight text-balance text-muted italic sm:text-[1.75rem]">
            studies how machines see, and how people move.
          </p>
          <p className="mt-5 max-w-[26rem] text-[15px] text-pretty leading-relaxed text-ink/80">
            Computer science major at the University of Michigan in Ann Arbor,
            working in computer vision. Away from the desk I dance hip-hop and
            carry a camera most places I go.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow rounded-full bg-ink px-6 py-3 text-paper transition-colors hover:bg-signal"
            >
              Resume ↗
            </a>
            <a
              href="#contact"
              className="eyebrow rounded-full border border-rule px-6 py-3 text-ink transition-colors hover:border-ink"
            >
              Get in touch
            </a>
          </div>
        </div>

        <Photo
          className="col-span-8 col-start-3 sm:col-span-5 sm:col-start-8"
          src="/photos/headshot.jpg"
          ratio="4/5"
          alt="Portrait of Darrin Du"
          note="Portrait"
          frame="person · 0.99"
          sizes="(min-width: 640px) 30vw, 70vw"
        />
      </div>

      <a
        href="#about"
        className="eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted transition-colors hover:text-ink"
      >
        Scroll down ↓
      </a>
    </section>
  );
}
