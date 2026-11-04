/** Shared look of every button and button-like link: pill shape, semibold text and an arrow */
const base =
  "group inline-flex items-center justify-center gap-2 rounded-full border-2 text-[0.9375rem] font-semibold transition-colors duration-300";

/** Orange button for light sections; turns navy on hover */
export const buttonPrimary = `${base} border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-white)] hover:border-[var(--color-navy)] hover:bg-[var(--color-navy)]`;

/** Orange button for dark sections; turns white on hover */
export const buttonPrimaryOnDark = `${base} border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-white)] hover:border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-navy-deep)]`;

/** Outlined button for dark sections; fills in white on hover */
export const buttonOutlineLight = `${base} border-[var(--color-white-20)] bg-transparent text-[var(--color-white)] hover:border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-navy-deep)]`;

/** Arrow inside a button that nudges up-right on hover */
export const buttonArrow = "size-4 shrink-0 transition-transform duration-300 group-hover:-rotate-45";
