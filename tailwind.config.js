/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        finance: {
          dark: '#08060d',
          card: '#16171d',
          border: '#2e303a',
          accent: '#aa3bff',
          accentDark: '#c084fc',
          textMuted: '#9ca3af',
          textMain: '#f3f4f6'
        }
      }
    },
  },
  plugins: [],
}
