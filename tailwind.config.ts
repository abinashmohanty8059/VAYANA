import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vayana: {
          cream: "#FAF7F2",
          parchment: "#F5EFEB",
          sand: "#EADBCE",
          borderMuted: "#E5DCC0",
          charcoal: "#141312",
          deepDark: "#0D0C0B",
          maroon: "#7A1B1C",
          crimson: "#8C2224",
          wine: "#5C1415",
          gold: "#C5A059",
          lightGold: "#E4C788",
          antiqueGold: "#B89047",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "Trajan Pro", "serif"],
        sans: ["var(--font-montserrat)", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: {
        widestLuxury: "0.28em",
        megaLuxury: "0.35em",
        heritage: "0.22em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
