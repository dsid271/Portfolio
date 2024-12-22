/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Ensure this is correct
    './components/**/*.{js,ts,jsx,tsx}',  // Ensure this is correct
    './src/**/*.{js,ts,jsx,tsx}',
    './**/*.{html}',  // Add this if you're using .html files too
  ],
  theme: {
    extend: {
      fontFamily: {
        extrude: ['extrude', 'sans-serif'],
        commodore: ['commodore', 'monospace'],      },
    },
  },
  plugins: [],
};
