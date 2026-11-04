import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "currentColor",
      },
      // the same font families as the CareHaven website, by the same names
      fontFamily: {
        sans: ["var(--font-primary)"],
        heading: ["var(--font-heading)"],
        display: ["var(--font-display)"],
        quote: ["var(--font-quote)"],
        alt: ["var(--font-alt)"],
        dm: ["var(--font-dm)"],
        form: ["var(--font-form)"],
        nunito: ["var(--font-nunito-face)"],
      },
    },
  },
};
export default config;
