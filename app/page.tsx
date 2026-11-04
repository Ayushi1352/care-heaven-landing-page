import rawData from "@/data/templates.json";
import type { NGOTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutUs } from "@/components/sections/AboutUs";
import { Impact } from "@/components/sections/Impact";
import { Causes } from "@/components/sections/Causes";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

const templateData: NGOTemplateData = rawData;
const sectionData = templateData.categories.NGO.sections;
const commonData = templateData.common;

/*
  One landing page with a section for each page of the CareHaven website (no blog, no team pages).
  The About Us page gives two sections (About and Why Choose Us with the impact numbers); Donate Now is merged
  into the contact section. The ids match the header and footer links in templates.json ("#about" → id="about");
  scroll-mt keeps each section clear of the fixed header when a link scrolls to it.
*/
export default function Home() {
  return (
    <main>
      <div id="home">
        <HeroSection data={sectionData.Hero?.variants?.NGOHero1} />
      </div>
      <div id="about" className="scroll-mt-[4.5rem]">
        <AboutUs data={sectionData.AboutUs?.variants?.NGOAboutUs1} />
        <Impact data={sectionData.Impact?.variants?.NGOImpact1} />
      </div>
      <div id="causes" className="scroll-mt-[4.5rem]">
        <Causes data={sectionData.Causes?.variants?.NGOCauses1} />
      </div>
      <div id="gallery" className="scroll-mt-[4.5rem]">
        <Gallery data={sectionData.Gallery?.variants?.NGOGallery1} />
      </div>
      <div id="testimonials" className="scroll-mt-[4.5rem]">
        <Testimonials data={sectionData.Testimonials?.variants?.NGOTestimonials1} />
      </div>
      <div id="faq" className="scroll-mt-[4.5rem]">
        <Faq data={sectionData.Faq?.variants?.NGOFaq1} />
      </div>
      <div id="contact" className="scroll-mt-[4.5rem]">
        <Contact
          data={sectionData.Contact?.variants?.NGOContact1}
          form={sectionData.EnquiryForm?.variants?.NGOEnquiryForm1}
          company={commonData.company}
        />
      </div>
    </main>
  );
}
