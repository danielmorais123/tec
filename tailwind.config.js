/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    screens: {
      'xs': '400px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin"), require("daisyui"), require('tailwind-scrollbar')],
};
