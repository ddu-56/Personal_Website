import ContactSheet from "./ContactSheet";
import FoldText from "./FoldText";
import { RESUME_URL } from "./Masthead";
import Photo from "./Photo";
import ScrollHint from "./ScrollHint";

export default function Intro() {
  return (
    // Fills the first screen (minus the masthead). Desktop: text left, photo
    // right, kept to roughly 60% of the width. Phones: photo stacked on top.
    // Full-bleed so the contact sheet behind it can run edge to edge.
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-3rem)] items-center pt-10 pb-[calc(var(--sheet-h)+5rem)] sm:pt-[calc(var(--sheet-h)+2.25rem)]"
    >
      <ContactSheet />

      <div className="wrap">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-y-8 sm:grid-cols-12 sm:gap-x-10">
          <div className="sm:col-span-7">
            <p data-intro="eyebrow" className="eyebrow text-muted">
              Computer Science · University of Michigan
            </p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,min(8vw,10svh),6.5rem)] leading-[0.9] tracking-[-0.02em]">
              <FoldText text="Darrin Du" delay={0.3} />
            </h1>
            <p className="mt-4 max-w-[24ch] font-serif text-2xl leading-tight text-balance text-muted italic sm:text-[1.75rem]">
              <FoldText
                text="studies how machines see, and how people move."
                splitBy="word"
                delay={0.75}
                duration={0.7}
                stagger={0.05}
              />
            </p>
            <p data-intro="body" className="mt-5 max-w-[26rem] text-[15px] text-pretty leading-relaxed text-ink/80">
              Computer science major at the University of Michigan in Ann Arbor,
              working in computer vision. Away from the desk I dance hip-hop and
              carry a camera most places I go.
            </p>

            <div data-intro="body" className="mt-8 flex flex-wrap gap-3">
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
            className="order-first w-36 sm:order-none sm:col-span-5 sm:col-start-8 sm:w-auto"
            src="/photos/headshot.jpg"
            ratio="4/5"
            alt="Portrait of Darrin Du"
            note="Portrait"
            intro="photo"
            preload
            frame="person · 0.99"
            sizes="(min-width: 640px) 30vw, 150px"
          />
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}
