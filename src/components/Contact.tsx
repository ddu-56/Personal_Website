import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "./Masthead";
import SectionHeader from "./SectionHeader";

const EMAIL = "darrindu06@gmail.com";

const links = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Resume", href: RESUME_URL },
];

export default function Contact() {
  return (
    <section id="contact" className="wrap pt-(--space-section) pb-10">
      <SectionHeader index="06" kicker="Contact" title="Say hello" />

      <div className="mt-(--space-stack) grid grid-cols-12 gap-x-6 gap-y-10">
        <div data-reveal className="col-span-12 sm:col-span-9 sm:col-start-4">
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

      <footer className="eyebrow mt-[calc(var(--space-section)*2)] flex flex-col gap-2 border-t border-rule pt-5 text-[10px] text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Darrin Du</span>
      </footer>
    </section>
  );
}
