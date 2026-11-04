import type { HeadingPart } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

/** Small rounded chip above a heading, with a heart (peach on light sections, see-through on dark ones) */
export const SectionLabel = ({ text, light = false, className = "" }: { text: string; light?: boolean; className?: string }) => (
  <p
    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold sm:text-[0.8125rem] ${
      light ? "bg-[var(--color-white-10)] text-[var(--color-sun)]" : "bg-[var(--color-bg-chip)] text-[var(--color-primary-strong)]"
    } ${className}`}
  >
    <Icon name="FaHeart" className="size-3" />
    {text}
  </p>
);

/** Heading text with its highlighted words in orange italics (sunny yellow on dark sections) */
export const HeadingText = ({ parts, light = false }: { parts: HeadingPart[]; light?: boolean }) =>
  parts.map((part) => (
    <span key={part.text} className={part.highlight ? `italic ${light ? "text-[var(--color-sun)]" : "text-[var(--color-primary)]"}` : ""}>
      {part.text}
    </span>
  ));

/** Same size and weight for every section title */
export const headingClass = "text-balance font-heading text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem] lg:text-[2.875rem]";

type SectionHeadingProps = {
  label: string;
  title: HeadingPart[];
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  descriptionClassName?: string;
  className?: string;
};

/** Section intro used across the page: chip, title with a highlight, optional text */
export const SectionHeading = ({ label, title, description, align = "left", light = false, descriptionClassName = "", className = "" }: SectionHeadingProps) => {
  const center = align === "center";

  return (
    <div data-reveal className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <SectionLabel text={label} light={light} />
      <h2 className={`mt-4 ${headingClass} ${light ? "text-[var(--color-white)]" : "text-[var(--color-heading)]"}`}>
        <HeadingText parts={title} light={light} />
      </h2>
      {description && (
        <p className={`mt-3 text-sm leading-relaxed sm:text-[1rem] ${light ? "text-[var(--color-white-70)]" : "text-[var(--color-text-muted)]"} ${descriptionClassName}`}>{description}</p>
      )}
    </div>
  );
};
