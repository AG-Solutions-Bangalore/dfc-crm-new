/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#F56616",
        "brand-orange-light": "#FF8A3D",
        "brand-orange-dark": "#D6550E",
        "brand-navy": "#0A1D3D",
        "brand-navy-dark": "#0A1D3D",
        "brand-navy-light": "#153B75",
        "brand-slate": "#EEF3FA",
        brand: {
          orange: {
            DEFAULT: "#F26A1B",
            light: "#FF8A3D",
            dark: "#D6550E",
          },
          navy: {
            DEFAULT: "#0B2A57",
            dark: "#0A1F44",
            light: "#153B75",
          },
          slate: "#EEF3FA",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        waving: "wave 1.5s infinite ease-in-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(11, 42, 87, 0.08), 0 4px 12px -2px rgba(11, 42, 87, 0.04)",
        floating: "0 25px 50px -12px rgba(11, 42, 87, 0.22), 0 12px 24px -8px rgba(242, 106, 27, 0.12)",
        glow: "0 8px 25px -4px rgba(242, 106, 27, 0.45)",
      },
    },
  },
  plugins: [],
});
