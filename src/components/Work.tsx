import { projects } from "@/data/projects";
import Details from "./Details";
import SectionHeader from "./SectionHeader";

export default function Work() {
  return (
    <section id="work" className="wrap py-12 sm:py-16">
      <SectionHeader index="03" kicker="Selected work" title="Things I’ve built" />

      <ol className="mt-10 border-b border-rule">
        {projects.map((project, i) => (
          <li key={project.title} className="border-t border-rule">
            <article
              data-frame={`${project.label} · ${(0.98 - i * 0.03).toFixed(2)}`}
              className="grid grid-cols-12 gap-x-6 gap-y-4 py-6 sm:py-8"
            >
              <span className="eyebrow col-span-2 pt-2 text-muted sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-10 sm:col-span-5">
                <h3 className="font-serif text-3xl leading-none sm:text-4xl">{project.title}</h3>
                <p className="mt-4 text-[15px] text-ink/80">{project.role}</p>
                <p className="eyebrow mt-3 text-[10px] text-muted">{project.dates}</p>
              </div>
              <div className="col-span-10 col-start-3 sm:col-span-6 sm:col-start-7 lg:col-span-5 lg:col-start-8">
                <Details summary={project.summary} bullets={project.bullets}>
                  <div className="eyebrow mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[10px]">
                    <span className="text-muted">{project.stack.join(" / ")}</span>
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-signal hover:text-ink"
                      >
                        Code ↗
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-signal hover:text-ink"
                      >
                        Demo ↗
                      </a>
                    )}
                  </div>
                </Details>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
