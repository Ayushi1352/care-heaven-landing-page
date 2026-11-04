export interface ThemeFonts {
  primary: string;
  heading: string;
  display: string;
  quote: string;
  alt: string;
  dm: string;
  form: string;
  nunito: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  lang: string;
}

export interface GlobalUIData {
  mainNav: string;
  mobileNav: string;
  openMenu: string;
  closeMenu: string;
  backToTop: string;
}

export interface LinkData {
  label: string;
  href: string;
}

export interface ImageData {
  src: string;
  alt: string;
}

export interface SizedImageData extends ImageData {
  width: number;
  height: number;
}

/** A heading split into parts; highlighted parts show in the brand colour. */
export interface HeadingPart {
  text: string;
  highlight: boolean;
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  lines: string[];
  href: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface CompanyData {
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
}

export interface FooterData {
  logo: SizedImageData;
  tagline: string;
  menuTitle: string;
  contactTitle: string;
  copyright: string;
}

export interface CommonData {
  theme: ThemeData;
  metadata: SiteMetadataData;
  globalUI: GlobalUIData;
  company: CompanyData;
  Footer?: FooterData;
}

export interface HeaderData {
  brand: {
    name: string;
    logo: SizedImageData;
  };
  navigation: LinkData[];
  cta: LinkData;
}

export interface HeroData {
  label: string;
  title: HeadingPart[];
  description: string;
  button: LinkData;
  image: ImageData;
}

export interface StatItem {
  value: string;
  label: string;
}

/** A short point with a title and one line of text */
export interface TextPoint {
  title: string;
  text: string;
}

export interface AboutUsData {
  label: string;
  title: HeadingPart[];
  description: string;
  image: ImageData;
  points: string[];
}

export interface ImpactData {
  label: string;
  title: HeadingPart[];
  description: string;
  image: ImageData;
  mission: TextPoint;
  call: {
    label: string;
    value: string;
    href: string;
  };
  stats: StatItem[];
}

export interface CauseCard {
  icon: string;
  title: string;
  text: string;
  image: string;
}

export interface CausesData {
  label: string;
  title: HeadingPart[];
  description: string;
  cardButton: LinkData;
  causes: CauseCard[];
}

export interface GalleryItem {
  tag: string;
  title: string;
  image: string;
  alt: string;
}

export interface GalleryData {
  label: string;
  title: HeadingPart[];
  description: string;
  stat: StatItem;
  items: GalleryItem[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface TestimonialsData {
  label: string;
  title: HeadingPart[];
  description: string;
  stars: number;
  ratingLabel: string;
  previousLabel: string;
  nextLabel: string;
  /** label of each dot under the slider, "{n}" is the review number */
  goToLabel: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData {
  label: string;
  title: HeadingPart[];
  description: string;
  items: FaqItem[];
  /** card beside the questions that points to the contact form */
  aside: {
    title: string;
    text: string;
    image: ImageData;
    button: LinkData;
  };
}

export interface ContactData {
  label: string;
  title: HeadingPart[];
  description: string;
  form: {
    title: string;
    description: string;
  };
}

export interface EnquiryFormData {
  fields: {
    name: string;
    phone: string;
    email: string;
    interest: string;
    cause: string;
    message: string;
  };
  interestOptions: string[];
  causeOptions: string[];
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

type Section<Variant extends string, Data> = {
  variants?: { [Name in Variant]?: Data };
};

export interface NGOSections {
  Header?: Section<"NGOHeader1", HeaderData>;
  Hero?: Section<"NGOHero1", HeroData>;
  AboutUs?: Section<"NGOAboutUs1", AboutUsData>;
  Impact?: Section<"NGOImpact1", ImpactData>;
  Causes?: Section<"NGOCauses1", CausesData>;
  Gallery?: Section<"NGOGallery1", GalleryData>;
  Testimonials?: Section<"NGOTestimonials1", TestimonialsData>;
  Faq?: Section<"NGOFaq1", FaqData>;
  Contact?: Section<"NGOContact1", ContactData>;
  EnquiryForm?: Section<"NGOEnquiryForm1", EnquiryFormData>;
}

export interface TemplateComponentEntry {
  key: string;
  component: string;
}

export interface TemplateComponents {
  shared: {
    Header: string;
    Footer: string;
  };
  pages: Record<string, { components: TemplateComponentEntry[] }>;
}

export interface NGOCategory {
  sections: NGOSections;
  templateComponents: TemplateComponents;
}

export interface NGOTemplateData {
  common: CommonData;
  categories: {
    NGO: NGOCategory;
  };
}
