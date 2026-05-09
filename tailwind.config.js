/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <-- YE LINE ADD KARO
  theme: {
    extend: {
      fontFamily: {
        logo: ['Bebas Neue', 'cursive'],
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}