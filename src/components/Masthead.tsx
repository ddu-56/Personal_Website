export const RESUME_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}/images/Darrin_Du_Resume_SWE.pdf`;

const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Photographs", href: "#photographs" },
  { label: "Dance", href: "#dance" },
];

export default function Masthead() {
  return (
    <header className="wrap eyebrow flex flex-col gap-3 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
      <a href="#top" className="text-ink">
        Darrin Du
      </a>
      <nav aria-label="Primary">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-muted">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal transition-colors hover:text-ink"
            >
              Resume ↗
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
