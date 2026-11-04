"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { GlobalUIData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { buttonArrow, buttonPrimary } from "@/components/ui/button";

/** id of the landing page section a link points to ("#about" → "about") */
const sectionId = (href: string) => href.replace(/^#/, "");

/** Keeps track of the section in the middle of the screen, so its link is shown as the current one */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

type HeaderProps = {
  data?: HeaderData;
  ui: GlobalUIData;
};

/**
 * White bar: logo on the left, the menu in a soft pill in the middle (the current section in white on navy),
 * Contact Us on the right. Below 1024px the menu opens as a navy panel under the bar.
 */
export const Header = ({ data, ui }: HeaderProps) => {
  const links = data?.navigation ?? [];
  const [ids] = useState(() => links.map((link) => sectionId(link.href)));
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!data) return null;
  const { brand, cta } = data;
  // the "Contact Us" button already leads to the contact section, so its link is left out of both menus
  const menuLinks = links.filter((link) => link.href !== cta.href);

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto max-w-[1920px] bg-[var(--color-bg-main)] shadow-[0_0.25rem_1.5rem_-1rem_var(--color-shadow-card)]">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={goHome} aria-label={ui.backToTop} className="shrink-0">
          <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={brand.logo.height} preload sizes="200px" className="h-auto w-[8.75rem] lg:w-[10.5rem]" />
        </Link>

        <nav aria-label={ui.mainNav} className="hidden items-center gap-1 rounded-full bg-[var(--color-bg-alt)] p-1 ring-1 ring-[var(--color-border)] lg:flex">
          {menuLinks.map((link) => {
            const current = sectionId(link.href) === active;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "location" : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 font-alt text-sm font-medium transition-colors duration-300 ${
                  current ? "bg-[var(--color-navy)] text-[var(--color-white)]" : "text-[var(--color-heading)] hover:text-[var(--color-primary)]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={cta.href} className={`${buttonPrimary} h-12 whitespace-nowrap px-6 max-sm:hidden`}>
            {cta.label}
            <Icon name="LuArrowRight" className={buttonArrow} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className={`grid size-11 place-items-center rounded-full transition-colors lg:hidden ${
              open ? "bg-[var(--color-navy)] text-[var(--color-white)]" : "bg-[var(--color-bg-alt)] text-[var(--color-heading)] hover:text-[var(--color-primary)]"
            }`}
          >
            <Icon name={open ? "LuX" : "LuMenu"} className="size-6" />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label={ui.mobileNav}
        // a navy panel as tall as its links, scrolling if they do not fit on the screen
        className={`absolute inset-x-0 top-full grid max-h-[calc(100dvh-4.5rem)] overflow-hidden bg-[var(--color-navy)] transition-[grid-template-rows,opacity] duration-500 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <ul className="mx-auto grid max-w-7xl gap-x-6 px-4 py-4 sm:grid-cols-2 sm:px-6 sm:py-6">
            {menuLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-3 border-b border-[var(--color-white-10)] py-3.5 font-heading text-[1.375rem] font-semibold transition-colors hover:text-[var(--color-sun)] ${
                    sectionId(link.href) === active ? "text-[var(--color-sun)]" : "text-[var(--color-white)]"
                  }`}
                >
                  <span className="text-sm italic text-[var(--color-primary)]">{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-5 sm:hidden">
              <a href={cta.href} onClick={() => setOpen(false)} className={`${buttonPrimary} h-12 w-full px-7 hover:border-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-navy-deep)]`}>
                {cta.label}
                <Icon name="LuArrowRight" className={buttonArrow} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
