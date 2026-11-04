"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a figure such as "1,200+" or "98%" up from zero the first time it is seen.
 * The server renders the final value, so it reads correctly without JavaScript.
 */
export const CountUp = ({ value, duration = 1600 }: { value: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    // "1,200" keeps its thousands separator while it counts
    const format = (n: number) => (digits.includes(",") ? n.toLocaleString("en-US") : String(n));
    let frame = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${prefix}${format(Math.round(target * eased))}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      el.textContent = value;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
};
