/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif" ]
    },
    colors: {
      white: '#fafafa',
      red: '#ef4444',
      fucsia: '#ec5990',
      fucsiaHover: '#ec4899',
      dark: '#0e101c',
      grey: '#d4d4d4',
    },
    screens: {
      'xs': {'min': '1px', 'max': '320px'},
      'sm': {'min': '321px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1279px'},
      'xl': {'min': '1280px', 'max': '1535px'},
      '2xl': {'min': '1536px'},
    },
    extend: {},
  },
  plugins: [],
}

