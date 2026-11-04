import type { TestimonialsData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";

/** Centred heading, then the reviews in a row that slides by itself */
export const Testimonials = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" label={data.label} title={data.title} description={data.description} />
        <div data-reveal className="mt-6 lg:mt-10">
          <TestimonialSlider data={data} />
        </div>
      </div>
    </section>
  );
};
