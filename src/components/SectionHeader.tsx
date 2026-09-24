export default function SectionHeader({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <header className="grid grid-cols-12 gap-x-6 border-t border-rule pt-5">
      <p className="eyebrow col-span-12 text-muted sm:col-span-3">
        {index} — {kicker}
      </p>
      <h2 className="col-span-12 mt-8 font-serif text-5xl leading-[0.95] tracking-tight sm:col-span-9 sm:mt-0 sm:text-7xl">
        {title}
      </h2>
    </header>
  );
}
