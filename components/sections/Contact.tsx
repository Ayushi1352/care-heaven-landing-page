import type { CompanyData, ContactData, EnquiryFormData } from "@/types/templates.types";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ContactProps = {
  data?: ContactData;
  form?: EnquiryFormData;
  company: CompanyData;
};

/**
 * Cream section with a centred heading over one large card: a navy panel with the contact details and socials on the
 * left, the message form on the right (stacked on phones). The website's Contact Us page; the header's Contact Us button leads here.
 */
export const Contact = ({ data: contact, form, company }: ContactProps) => {
  if (!contact) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" label={contact.label} title={contact.title} description={contact.description} />

        <div
          data-reveal
          className="mt-6 grid overflow-hidden rounded-[2rem] bg-[var(--color-bg-main)] shadow-[0_2rem_4rem_-2.5rem_var(--color-shadow-card)] md:grid-cols-[0.8fr_1.2fr] lg:mt-10"
        >
          <div className="relative isolate flex flex-col overflow-hidden bg-[var(--color-navy)] p-6 sm:p-8 lg:p-10">
            {/* large soft heart in the corner */}
            <Icon name="FaHeart" className="absolute -bottom-10 -right-8 -z-10 size-48 text-[var(--color-white-10)]" />
            <ul className="grid gap-5">
              {company.contactInfo.map((item) => {
                const external = item.href.startsWith("http");
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-white)] transition-colors group-hover:bg-[var(--color-sun)] group-hover:text-[var(--color-navy-deep)]">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-lg font-semibold text-[var(--color-white)]">{item.title}</span>
                      <span className="block break-words font-form text-sm text-[var(--color-white-70)]">{item.lines.join(" ")}</span>
                    </span>
                  </>
                );
                return (
                  <li key={item.title}>
                    {item.href ? (
                      <a href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex items-center gap-4">
                        {body}
                      </a>
                    ) : (
                      // the volunteer note has no link
                      <div className="group flex items-center gap-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2.5 border-t border-[var(--color-white-15)] pt-6 md:mt-auto">
              {company.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full bg-[var(--color-white-10)] text-[var(--color-white)] transition-colors duration-300 hover:bg-[var(--color-sun)] hover:text-[var(--color-navy-deep)]"
                >
                  <Icon name={social.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* from tablet up the message box takes up any spare height, so both halves end level */}
          <div className="flex min-w-0 flex-col p-5 sm:p-8 lg:p-10">
            <h3 className="font-heading text-[1.75rem] font-semibold leading-tight text-[var(--color-heading)]">{contact.form.title}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{contact.form.description}</p>
            <EnquiryForm data={form} />
          </div>
        </div>
      </div>
    </section>
  );
};
