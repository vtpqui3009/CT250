module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      colors: {
        "base-color": "#97AE76",
        "base-hover": "#7E975A",
        "footer-color": "#EDF2F5",
        "footer-button": "#7FAD39",
        "input-color": "#F0F4F7",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
