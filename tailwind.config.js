/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
      'my-shadow': '-1px 3px rgba(0, 0, 0, 0.2)',
    },},
  },
  plugins: [],
}