import Image from "next/image";
import type { CompanyData, FooterData, LinkData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
const currentYear = async () => {
  "use cache";
  return new Date().getFullYear();
};

const columnTitle = "font-heading text-xl font-semibold text-[var(--color-white)]";

type FooterProps = {
  data?: FooterData;
  company: CompanyData;
  /** the header menu, shown again as the footer's menu links */
  links?: LinkData[];
};

/** Navy footer: logo, menu and contact columns; copyright and socials in the bottom bar */
export const Footer = async ({ data: footer, company, links = [] }: FooterProps) => {
  if (!footer) return null;
  const copyright = footer.copyright.replace("{year}", String(await currentYear()));

  return (
    <footer className="bg-[var(--color-navy-deep)] text-[var(--color-white-70)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-6 gap-y-9 py-12 sm:grid-cols-[1.3fr_0.7fr_1fr] lg:grid-cols-[1.4fr_0.8fr_1.1fr] lg:gap-12 lg:py-16">
          <div>
            {/* the white version of the logo, made for dark backgrounds */}
            <Image src={footer.logo.src} alt={footer.logo.alt} width={footer.logo.width} height={footer.logo.height} sizes="220px" className="h-auto w-48" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{footer.tagline}</p>
          </div>

          <nav aria-label={footer.menuTitle}>
            <h2 className={columnTitle}>{footer.menuTitle}</h2>
            <ul className="mt-4 grid grid-cols-2 justify-items-start gap-x-2.5 gap-y-2 text-sm sm:grid-cols-1">
              {links.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className="group inline-flex items-center gap-2 transition-colors hover:text-[var(--color-sun)]">
                    <span className="size-1.5 rounded-full bg-[var(--color-primary)] transition-transform group-hover:scale-150" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={columnTitle}>{footer.contactTitle}</h2>
            <ul className="mt-4 grid gap-3.5 text-sm">
              {/* the volunteer note has no link and is already in the contact section, so the footer keeps the three ways to reach the team */}
              {company.contactInfo
                .filter((item) => item.href)
                .map((item) => {
                  const external = item.href.startsWith("http");
                  return (
                    <li key={item.title} className="flex min-w-0 items-start gap-3">
                      <Icon name={item.icon} className="mt-0.5 size-[1.125rem] shrink-0 text-[var(--color-sun)]" />
                      <a
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="min-w-0 break-words transition-colors hover:text-[var(--color-white)]"
                      >
                        {item.lines.join(" ")}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-[var(--color-white-10)] py-5 text-center text-xs sm:flex-row sm:text-left">
          <p>{copyright}</p>
          <div className="flex gap-2">
            {company.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid size-9 place-items-center rounded-full border border-[var(--color-white-15)] text-[var(--color-white)] transition-colors duration-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]"
              >
                <Icon name={social.icon} className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
