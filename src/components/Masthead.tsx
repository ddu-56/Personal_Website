export const RESUME_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}/images/Darrin_Du_Resume_SWE.pdf`;
export const GITHUB_URL = "https://github.com/ddu-56";
export const LINKEDIN_URL = "https://www.linkedin.com/in/darrin-du06";

// Off-site links, set apart from the section links in signal red.
const external = [
  { label: "Resume", href: RESUME_URL },
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
];

const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Photographs", href: "#photographs" },
  { label: "Dance", href: "#dance" },
];

// Just the links: section anchors, then off-site links after a hairline.
// Right-aligned on wide screens, left-aligned (and wrapping) on small ones.
export default function Masthead() {
  return (
    <header data-intro="nav" className="wrap eyebrow flex pt-6 pb-2 lg:justify-end">
      <nav aria-label="Primary">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
          <li aria-hidden className="hidden w-px self-stretch bg-rule lg:block" />
          {external.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal transition-colors hover:text-ink"
              >
                {item.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
