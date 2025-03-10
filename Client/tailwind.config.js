/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'custom-teal-dark': '#006666',
        "custom-blue-start": "rgb(137, 165, 199)",
        "custom-blue-end": "#AFD7E6",
      },
    },
  },
  plugins: [],
};
