/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#87cefa",
        primary: "#292524",
        secondary: "#113264",
      },
    },
  },
  plugins: [],
};
