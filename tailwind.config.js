/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
  ],
  theme: {
    extend: {
      colors: {
        discord: "#7289DA",
        google: "#EA4335",
        apple: "#000000"
      }
    },
  },
  important: true,
  plugins: [require('daisyui')],
}
