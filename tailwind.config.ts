import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          // ... other blue shades
        }
      }
    },
  },
  plugins: [],
};

export default config;
