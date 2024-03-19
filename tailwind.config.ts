import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      spacing: {
        footer: "var(--height-footer)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
