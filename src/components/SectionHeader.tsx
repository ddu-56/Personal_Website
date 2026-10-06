import FoldText from "./FoldText";

export default function SectionHeader({
  index,
  kicker,
  title,
  centered = false,
}: {
  index: string;
  kicker: string;
  title: string;
  /** Puts the title on its own row, centered across the full width. */
  centered?: boolean;
}) {
  return (
    <header className="grid grid-cols-12 gap-x-6 border-t border-rule pt-5">
      <p data-reveal className="eyebrow col-span-12 text-muted sm:col-span-3">
        {index} — {kicker}
      </p>
      <h2
        className={`col-span-12 mt-4 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl ${
          centered ? "text-center" : "sm:col-span-9 sm:mt-0"
        }`}
      >
        <FoldText text={title} splitBy="word" trigger="scroll" stagger={0.08} />
      </h2>
    </header>
  );
}
