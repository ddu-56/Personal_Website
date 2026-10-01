import { RESUME_URL } from "./Masthead";
import SectionHeader from "./SectionHeader";

const EMAIL = "dudarrin@umich.edu";

const links = [
  { label: "GitHub", href: "https://github.com/ddu-56" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/darrin-du06" },
  { label: "Resume", href: RESUME_URL },
];

export default function Contact() {
  return (
    <section id="contact" className="wrap pt-12 pb-10 sm:pt-16">
      <SectionHeader index="06" kicker="Contact" title="Say hello" />

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 sm:col-span-9 sm:col-start-4">
          <a
            href={`mailto:${EMAIL}`}
            data-frame="contact · 1.00"
            className="inline-block font-serif text-[clamp(2.25rem,7vw,6rem)] leading-none decoration-1 underline-offset-8 hover:underline"
          >
            {EMAIL}
          </a>
          <ul className="eyebrow mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal hover:text-ink"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="eyebrow mt-32 flex flex-col gap-2 border-t border-rule pt-5 text-[10px] text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Darrin Du</span>
        <span>Set in Instrument Serif, Instrument Sans &amp; IBM Plex Mono</span>
      </footer>
    </section>
  );
}
