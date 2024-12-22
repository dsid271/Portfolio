/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        extrude: ['Extrude', 'sans-serif'],
        commodore: ['commodore', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
