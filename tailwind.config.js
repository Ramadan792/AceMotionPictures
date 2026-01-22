/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ace-purple': '#1a0b2e',
        'ace-blue': '#2563eb',
      },
    },
  },
  plugins: [],
}