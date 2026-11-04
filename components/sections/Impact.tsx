import Image from "next/image";
import type { ImpactData } from "@/types/templates.types";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tones } from "@/components/ui/tones";

/** the four numbers take the logo's colours in turn */
const statTones = ["orange", "sun", "green", "navy"];

/**
 * Why choose us (from the website's About Us page): the smiling girl photo fills the section under a deep navy wash.
 * Heading, our mission and the call line on the left; the four impact numbers as coloured tiles on the right.
 */
export const Impact = ({ data }: { data?: ImpactData }) => {
  if (!data) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] py-[var(--section-gap)]">
      <Image quality={75} src={data.image.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--color-navy-90)]" />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionHeading light label={data.label} title={data.title} description={data.description} />

          <div data-reveal className="mt-6 border-l-2 border-[var(--color-sun)] pl-5 lg:mt-8">
            <h3 className="font-heading text-xl font-semibold text-[var(--color-white)]">{data.mission.title}</h3>
            <p className="mt-1 font-alt text-sm leading-relaxed text-[var(--color-white-70)]">{data.mission.text}</p>
          </div>

          <a data-reveal href={data.call.href} className="group mt-7 inline-flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-white)] ring-[0.375rem] ring-[var(--color-white-10)] transition-colors duration-300 group-hover:bg-[var(--color-white)] group-hover:text-[var(--color-primary)]">
              <Icon name="LuPhoneCall" className="size-5" />
            </span>
            <span>
              <span className="block text-xs text-[var(--color-white-70)]">{data.call.label}</span>
              <span className="block font-heading text-xl font-semibold text-[var(--color-white)]">{data.call.value}</span>
            </span>
          </a>
        </div>

        <ul data-reveal className="grid grid-cols-2 gap-3 lg:gap-4">
          {data.stats.map((stat, index) => {
            const tone = tones[statTones[index % statTones.length]];
            // the navy tile gets a thin edge so it still stands out on the navy section; every second tile sits lower on desktop
            return (
              <li
                key={stat.label}
                className={`flex min-h-[8.5rem] flex-col justify-end rounded-[1.5rem] p-4 sm:min-h-[11rem] sm:p-6 ${tone.card} ${index % 2 ? "lg:translate-y-8" : ""} ${
                  statTones[index % statTones.length] === "navy" ? "ring-1 ring-[var(--color-white-20)]" : ""
                }`}
              >
                <span className="font-heading text-[2.5rem] font-semibold leading-none tracking-[-0.02em] sm:text-[3.5rem]">
                  <CountUp value={stat.value} />
                </span>
                <span className={`mt-2 font-alt text-xs font-medium sm:text-sm ${tone.soft}`}>{stat.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
