import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#000000",
        },
        neutral: {
          // This one according to the style guide which is less likely to apply to the UI.....
          1: "#FEFEFE",
          2: "#F3F5F7",
          3: "#E8ECEF",
          4: "#343839",
          5: "#6C7275",
          6: "#232627",
          7: "#141718",
        },
        dark: {
          // darkest to less dark 6 is grey
          1: "#111111",
          2: "#141718",
          3: "#22262e",
          4: "#232627",
          5: "#353945",
        },
        light: {
          1: "#ffffff",
          2: "#fdfdfd",
        },
        grey: {
          // arkest grey to the lightest grey
          1: "#6c7174",
          2: "#807e7e",
          3: "#e8ecef",
          4: "#f3f5f6",
          5: "#b0b4c3",
        },
        "accent-green": "#38cb89",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      fontFamily: {
        inter: ["var(--font-inter)"],
        Poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
