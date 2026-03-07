/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blush-rose": "#C8AAA8",
        "soft-sage": "#F0EEE9",
        "near-black": "#2D2D2D",
        "dark-muted": "#5C5C5C",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ['"DM Serif Display"', "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      letterSpacing: {
        widest: ".25em",
      },
      fontSize: {
        hero: "clamp(3rem, 8vw, 6.5rem)",
        h2: "clamp(2rem, 5vw, 3.5rem)",
        h3: "clamp(1.25rem, 3vw, 1.75rem)",
      },
    },
  },
  plugins: [],
}
