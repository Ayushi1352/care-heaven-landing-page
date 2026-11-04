import Image from "next/image";
import type { FaqData, FaqItem } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonArrow, buttonPrimaryOnDark } from "@/components/ui/button";

/** One question as a native <details> (one open at a time via `name`), so the answers work and are findable without JavaScript */
const Question = ({ item, index, open }: { item: FaqItem; index: number; open: boolean }) => (
  <details name="faq" open={open} className="group border-b border-[var(--color-border)]">
    <summary className="flex list-none items-center gap-4 py-4 font-heading text-[1.125rem] font-semibold leading-snug text-[var(--color-heading)] transition-colors hover:text-[var(--color-primary)] sm:text-[1.25rem] lg:py-5 [&::-webkit-details-marker]:hidden">
      <span className="text-sm italic text-[var(--color-primary)]">{String(index + 1).padStart(2, "0")}</span>
      <span className="flex-1">{item.question}</span>
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-primary)] transition-[transform,background-color,border-color,color] duration-300 group-open:rotate-45 group-open:border-[var(--color-primary)] group-open:bg-[var(--color-primary)] group-open:text-[var(--color-white)]">
        <Icon name="LuPlus" className="size-4" />
      </span>
    </summary>
    <p className="pb-5 pl-9 pr-12 font-alt text-sm leading-relaxed text-[var(--color-text-muted)]">{item.answer}</p>
  </details>
);

/** Heading and a photo card that leads to the contact form on the left; the questions as a numbered list on the right */
export const Faq = ({ data: faq }: { data?: FaqData }) => {
  if (!faq) return null;
  const { aside } = faq;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      {/* heading, questions, card in that order on phones and tablets; on desktop the heading and card share the left column */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8 lg:px-8">
        <SectionHeading label={faq.label} title={faq.title} description={faq.description} />

        <div data-reveal className="border-t border-[var(--color-border)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          {faq.items.map((item, index) => (
            <Question key={item.question} item={item} index={index} open={index === 0} />
          ))}
        </div>

        <div data-reveal className="relative isolate flex flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 sm:p-7 lg:col-start-1 lg:row-start-2">
          <Image quality={75} src={aside.image.src} alt={aside.image.alt} fill sizes="(min-width: 1024px) 480px, 92vw" className="-z-20 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,var(--color-navy-95)_35%,var(--color-navy-60)_100%)]" />
          <h3 className="mt-10 font-heading text-[1.5rem] font-semibold text-[var(--color-white)] sm:text-[1.75rem] lg:mt-16">{aside.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-white-85)]">{aside.text}</p>
          <a href={aside.button.href} className={`${buttonPrimaryOnDark} mt-5 h-11 self-start px-6`}>
            {aside.button.label}
            <Icon name="LuArrowRight" className={buttonArrow} />
          </a>
        </div>
      </div>
    </section>
  );
};
