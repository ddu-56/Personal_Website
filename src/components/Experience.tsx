import { experience } from "@/data/experience";
import Details from "./Details";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="wrap section-y">
      <SectionHeader index="02" kicker="Experience" title="Where I’ve worked" />

      <ol className="mt-(--space-stack) border-b border-rule">
        {experience.map((job, i) => (
          <li key={job.org} data-reveal className="border-t border-rule">
            <article
              data-frame={`${job.label} · ${(0.99 - i * 0.02).toFixed(2)}`}
              className="grid grid-cols-12 gap-x-6 gap-y-4 py-6 sm:py-8"
            >
              <span className="eyebrow col-span-2 pt-2 text-muted sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-10 sm:col-span-5">
                <h3 className="font-serif text-3xl leading-none sm:text-4xl">{job.org}</h3>
                <p className="mt-4 text-[15px] text-ink/80">{job.role}</p>
                <p className="eyebrow mt-3 text-[10px] text-muted">
                  {job.dates} · {job.location}
                </p>
              </div>
              <div className="col-span-10 col-start-3 sm:col-span-6 sm:col-start-7 lg:col-span-5 lg:col-start-8">
                <Details summary={job.summary} bullets={job.bullets}>
                  <p className="eyebrow mt-3 text-[10px] text-muted">{job.stack.join(" / ")}</p>
                </Details>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
