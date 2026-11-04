import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { HeadingText, SectionLabel } from "@/components/ui/SectionHeading";
import { buttonArrow, buttonPrimaryOnDark } from "@/components/ui/button";

/**
 * Full-width classroom photo under a navy wash (solid on the left behind the text, clear on the right), with a short
 * heading, one line and the contact button in front. It is exactly one screen tall (header included), so the
 * whole banner is seen at once; on very short or very tall screens it stops at a sensible height.
 */
export const HeroSection = ({ data: hero }: { data?: HeroData }) => {
  if (!hero) return null;

  return (
    <section className="relative isolate flex min-h-[32rem] flex-col overflow-hidden bg-[var(--color-navy-deep)] pt-[4.5rem] h-[100svh] max-h-[60rem]">
      <Image src={hero.image.src} alt={hero.image.alt} fill preload quality={90} sizes="100vw" className="-z-20 object-cover object-[25%_center]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-navy-60)_0%,var(--color-navy-90)_70%)] lg:bg-[linear-gradient(90deg,var(--color-navy-95)_0%,var(--color-navy-90)_35%,var(--color-navy-20)_72%,var(--color-navy-0)_100%)]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl pb-6 pt-16 transition sm:pt-20 lg:pt-24-[opacity,transform] duration-700 ease-out [@starting-style]:translate-y-5 [@starting-style]:opacity-0">
          <SectionLabel text={hero.label} light />
          <h1 className="mt-5 font-display text-[2.75rem] font-normal uppercase leading-[1.02] text-[var(--color-white)] sm:text-[4rem] lg:text-[4.5rem]">
            <HeadingText parts={hero.title} light />
          </h1>
          <p className="mt-5 max-w-md font-nunito leading-relaxed text-[var(--color-white-85)] sm:text-[1.125rem]">{hero.description}</p>
          <a href={hero.button.href} className={`${buttonPrimaryOnDark} mt-8 h-[3.25rem] px-8`}>
            {hero.button.label}
            <Icon name="LuArrowRight" className={buttonArrow} />
          </a>
        </div>
      </div>
    </section>
  );
};
