/**
 * The four card colours of the CareHaven logo (orange heart, green leaves, navy hands) plus the sunny yellow,
 * used by the hero's help cards and the impact numbers. `soft` is the text under the title.
 */
export const tones: Record<string, { card: string; icon: string; soft: string }> = {
  orange: {
    card: "bg-[var(--color-primary)] text-[var(--color-white)]",
    icon: "bg-[var(--color-white-20)] text-[var(--color-white)]",
    soft: "text-[var(--color-white-85)]",
  },
  green: {
    card: "bg-[var(--color-green)] text-[var(--color-white)]",
    icon: "bg-[var(--color-white-20)] text-[var(--color-white)]",
    soft: "text-[var(--color-white-85)]",
  },
  navy: {
    card: "bg-[var(--color-navy)] text-[var(--color-white)]",
    icon: "bg-[var(--color-white-15)] text-[var(--color-sun)]",
    soft: "text-[var(--color-white-70)]",
  },
  sun: {
    card: "bg-[var(--color-sun)] text-[var(--color-navy-deep)]",
    icon: "bg-[var(--color-navy-deep)] text-[var(--color-sun)]",
    soft: "text-[var(--color-navy)]",
  },
};

/** Phones: a long list becomes one swipeable row (the next card peeks in), so its section still fits on one screen. */
export const swipeRow =
  "max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:scroll-px-4 max-sm:overflow-x-auto max-sm:px-4 max-sm:[scrollbar-width:none]";
export const swipeItem = "max-sm:w-[78%] max-sm:shrink-0 max-sm:snap-start";
