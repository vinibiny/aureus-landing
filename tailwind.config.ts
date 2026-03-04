import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: "#000000",
        "void-deep": "#0a0015",
        gold: "#D4AF37",
        cyan: "#00f0ff",
        indigo: "#4b0082",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "orbit-slow": "orbit 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
