import Image from "next/image";
import type { AboutUsData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonArrow, buttonPrimary } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";

/** Story, four quick points and the button on the left; the waving children in a large rounded frame with an orange frame peeking out behind it on the right */
export const AboutUs = ({ data: about }: { data?: AboutUsData }) => {
  if (!about) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20 lg:px-8">
        <div>
          <SectionHeading label={about.label} title={about.title} description={about.description} />

          <ul data-reveal className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8">
            {about.points.map((point) => (
              <li key={point} className="flex items-center gap-3 rounded-xl bg-[var(--color-bg-alt)] px-4 py-3 font-alt text-sm font-medium text-[var(--color-heading)]">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-green)] text-[var(--color-white)]">
                  <Icon name="LuCheck" className="size-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <a data-reveal href={about.button.href} className={`${buttonPrimary} mt-7 h-12 px-7`}>
            {about.button.label}
            <Icon name="LuArrowRight" className={buttonArrow} />
          </a>
        </div>

        <div data-reveal className="relative pb-4 pr-4 sm:pb-6 sm:pr-6">
          {/* orange frame behind the photo, shifted down and right */}
          <div aria-hidden="true" className="absolute bottom-0 left-5 right-0 top-5 rounded-[2rem] bg-[var(--color-primary)] sm:left-8 sm:top-8" />
          <div className="relative h-80 overflow-hidden rounded-[2rem] sm:h-[28rem] lg:h-[32rem]">
            <Image quality={90} src={about.image.src} alt={about.image.alt} fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover object-[center_20%]" />
          </div>
        </div>
      </div>
    </section>
  );
};
