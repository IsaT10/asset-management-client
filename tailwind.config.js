/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#006CAD',
        darkBlue: '#014F7F',
      },
      fontFamily: {
        popins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
