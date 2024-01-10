/** @type {import('tailwindcss').Config} */
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
    extend: {},
  },
  plugins: [],
}

