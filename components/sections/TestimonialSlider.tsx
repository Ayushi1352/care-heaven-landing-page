"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TestimonialsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

const AUTOPLAY_MS = 5000;

/**
 * Review cards in a row that slides by itself, one card every five seconds, and starts again from the first one at
 * the end. One card shows on phones, two on tablets and three on desktop; the first card in view is the navy one.
 * It waits while pointed at or touched, can be swiped, and the arrows and dots move it by hand. With reduced motion
 * turned on it does not move by itself.
 */
export const TestimonialSlider = ({ data }: { data: TestimonialsData }) => {
  const { items } = data;
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(items.length);
  const [paused, setPaused] = useState(false);

  /** width of one card plus the gap, the distance of one step */
  const step = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
  };

  const goTo = useCallback((index: number) => {
    const el = track.current;
    const distance = step();
    if (!el || !distance) return;
    el.scrollTo({ left: index * distance });
  }, []);

  // keep the current card and the number of stops in step with the scroll position and screen width
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const distance = step();
      if (!distance) return;
      setPages(Math.round((el.scrollWidth - el.clientWidth) / distance) + 1);
      setActive(Math.round(el.scrollLeft / distance));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // moves on by itself; the timer starts again after every move, so a hand-picked card also stays its full time
  useEffect(() => {
    if (paused || pages < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => goTo(active + 1 >= pages ? 0 : active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, pages, paused, goTo]);

  const arrow =
    "grid size-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-heading)] transition-colors duration-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)]";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul
        ref={track}
        aria-live={paused ? "polite" : "off"}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-5 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const featured = index === active;
          return (
            <li
              key={item.name}
              className={`flex w-full shrink-0 snap-start flex-col rounded-[1.75rem] p-6 transition-colors duration-500 sm:w-[calc((100%-1rem)/2)] sm:p-7 lg:w-[calc((100%-2.5rem)/3)] ${
                featured ? "bg-[var(--color-navy)]" : "bg-[var(--color-bg-main)] ring-1 ring-inset ring-[var(--color-border)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon name="FaQuoteLeft" className={`size-8 transition-colors duration-500 ${featured ? "text-[var(--color-sun)]" : "text-[var(--color-primary)]"}`} />
                <span className="flex gap-0.5 text-[var(--color-star)]" role="img" aria-label={data.ratingLabel}>
                  {Array.from({ length: data.stars }, (_, n) => (
                    <Icon key={n} name="FaStar" className="size-3.5" />
                  ))}
                </span>
              </div>
              <blockquote
                className={`mt-4 flex-1 font-quote text-[1.0625rem] italic leading-relaxed transition-colors duration-500 sm:text-lg ${
                  featured ? "text-[var(--color-white)]" : "text-[var(--color-heading)]"
                }`}
              >
                “{item.quote}”
              </blockquote>
              <div className={`mt-6 flex items-center gap-3 border-t pt-5 transition-colors duration-500 ${featured ? "border-[var(--color-white-15)]" : "border-[var(--color-border)]"}`}>
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[var(--color-bg-chip)]">
                  <Image src={item.image} alt="" fill sizes="48px" className="object-cover object-top" />
                </span>
                <span className="min-w-0 font-dm">
                  <span className={`block font-semibold transition-colors duration-500 ${featured ? "text-[var(--color-white)]" : "text-[var(--color-heading)]"}`}>{item.name}</span>
                  <span className={`block text-sm transition-colors duration-500 ${featured ? "text-[var(--color-white-70)]" : "text-[var(--color-text-muted)]"}`}>{item.role}</span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {Array.from({ length: pages }, (_, n) => (
            <button
              key={n}
              type="button"
              aria-label={data.goToLabel.replace("{n}", String(n + 1))}
              aria-current={n === active}
              onClick={() => goTo(n)}
              className="grid h-6 place-items-center"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${n === active ? "w-7 bg-[var(--color-primary)]" : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-primary-70)]"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button type="button" aria-label={data.previousLabel} onClick={() => goTo(active - 1 < 0 ? pages - 1 : active - 1)} className={arrow}>
            <Icon name="LuChevronLeft" className="size-5" />
          </button>
          <button type="button" aria-label={data.nextLabel} onClick={() => goTo(active + 1 >= pages ? 0 : active + 1)} className={arrow}>
            <Icon name="LuChevronRight" className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
