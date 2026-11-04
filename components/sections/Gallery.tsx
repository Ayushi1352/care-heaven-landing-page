import Image from "next/image";
import type { GalleryData } from "@/types/templates.types";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { swipeItem, swipeRow } from "@/components/ui/tones";

/**
 * Heading with the campaign count beside it, then the photos as a bento grid: the first photo large, the rest
 * around it (six photos from tablet up). On phones every photo is in one swipeable row.
 * Captions always show, so they work on touch screens too.
 */
export const Gallery = ({ data }: { data?: GalleryData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <SectionHeading label={data.label} title={data.title} description={data.description} />
          <p data-reveal className="flex items-center gap-4 self-start md:self-end">
            <span className="font-heading text-[3rem] font-semibold italic leading-none text-[var(--color-primary)] lg:text-[4rem]">
              <CountUp value={data.stat.value} />
            </span>
            <span className="max-w-[9rem] border-l border-[var(--color-border)] pl-4 text-sm leading-snug text-[var(--color-text-muted)]">{data.stat.label}</span>
          </p>
        </div>

        <ul
          data-reveal
          className={`mt-6 grid gap-3 sm:grid-cols-3 sm:grid-rows-[repeat(3,11rem)] lg:mt-10 lg:grid-cols-4 lg:grid-rows-[repeat(2,15rem)] lg:gap-4 ${swipeRow}`}
        >
          {data.items.map((item, index) => (
            <li
              key={item.image}
              className={`group relative overflow-hidden rounded-[1.5rem] bg-[var(--color-navy)] max-sm:h-64 sm:[&:nth-child(n+7)]:hidden ${swipeItem} ${
                // tablet (3 × 3): the first photo takes 2 × 2; desktop (4 × 2): the first photo is one tall column and the sixth spans two
                index === 0 ? "sm:col-span-2 sm:row-span-2 lg:col-span-1" : ""
              } ${index === 5 ? "lg:col-span-2" : ""}`}
            >
              <Image
                quality={90}
                src={item.image}
                alt={item.alt}
                fill
                sizes={index === 0 || index === 5 ? "(min-width: 1024px) 620px, (min-width: 640px) 66vw, 78vw" : "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 78vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,var(--color-navy-90)_0%,var(--color-navy-0)_100%)]" />
              <span className="absolute inset-x-4 bottom-4">
                <span className="inline-block rounded-full bg-[var(--color-sun)] px-2.5 py-0.5 text-[0.6875rem] font-semibold text-[var(--color-navy-deep)]">{item.tag}</span>
                <span className={`mt-1.5 block font-heading font-semibold leading-tight text-[var(--color-white)] ${index === 0 ? "text-[1.375rem] lg:text-[1.75rem]" : "text-lg"}`}>
                  {item.title}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
