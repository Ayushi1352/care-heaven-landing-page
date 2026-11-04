import Image from "next/image";
import type { CausesData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonArrow } from "@/components/ui/button";
import { swipeItem, swipeRow } from "@/components/ui/tones";

/**
 * Centred heading, then the six causes (the website's Our Causes page). Desktop: two columns of wide cards with the
 * photo on the left; tablet: a two-column grid of photo-on-top cards; phones: one swipeable row of them.
 * The whole card is a link to the donation form.
 */
export const Causes = ({ data }: { data?: CausesData }) => {
  if (!data) return null;
  const { cardButton } = data;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" label={data.label} title={data.title} description={data.description} />

        <ul data-reveal className={`mt-6 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-5 ${swipeRow}`}>
          {data.causes.map((cause) => (
            <li key={cause.title} className={`flex ${swipeItem}`}>
              <a
                href={cardButton.href}
                aria-label={`${cardButton.label}: ${cause.title}`}
                className="group flex w-full flex-col overflow-hidden rounded-[1.5rem] bg-[var(--color-bg-main)] ring-1 ring-[var(--color-border)] transition-shadow duration-300 hover:shadow-[0_1.25rem_2.5rem_-1.5rem_var(--color-shadow-card)] lg:flex-row"
              >
                <span className="relative block h-44 shrink-0 overflow-hidden sm:h-48 lg:h-auto lg:w-[42%]">
                  <Image quality={90} src={cause.image} alt="" fill sizes="(min-width: 1024px) 260px, (min-width: 640px) 46vw, 78vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="relative flex flex-1 flex-col p-5 lg:py-6 lg:pl-6 lg:pr-5">
                  {/* the cause's icon sits on the photo edge: on top of the text on phones and tablets, beside it on desktop */}
                  <span className="absolute -top-6 right-5 grid size-12 place-items-center rounded-full border-4 border-[var(--color-bg-main)] bg-[var(--color-primary)] text-[var(--color-white)] lg:static lg:size-11 lg:border-0 lg:bg-[var(--color-bg-chip)] lg:text-[var(--color-primary)]">
                    <Icon name={cause.icon} className="size-5" />
                  </span>
                  <span className="font-heading text-[1.375rem] font-semibold leading-tight text-[var(--color-heading)] lg:mt-3">{cause.title}</span>
                  <span className="mt-1.5 flex-1 font-alt text-sm leading-relaxed text-[var(--color-text-muted)]">{cause.text}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]">
                    {cardButton.label}
                    <Icon name="LuArrowRight" className={buttonArrow} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};
