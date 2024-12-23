/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bright-pink': '#FF007F',
        'bright-yellow': '#FFD700',
        'bright-green': '#00FF00',
      },
    },
  },
  plugins: [],
};
