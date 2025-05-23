/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bright-pink': '#FF007F',
        'bright-yellow': '#FFD700',
        'bright-green': '#00FF00',
        'genshin-bg': '#2c3e50',
        'genshin-bg-light': '#34495e',
        'genshin-text': '#fdf6e3',
        'genshin-text-darker': '#cac2a7',
        'genshin-blue': '#3498db',
        'genshin-blue-dark': '#2980b9',
        'genshin-gold': '#f1c40f',
        'genshin-aqua': '#1abc9c',
      },
      boxShadow: {
        'pixel-lift': '3px 3px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
