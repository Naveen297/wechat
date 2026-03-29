/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mahindra: {
          red: '#e31e24',
          'red-dark': '#c41a1f',
          'red-light': '#ff3b41',
          black: '#0a0a0a',
          'gray-dark': '#1a1a1a',
          'gray-darker': '#111111',
          white: '#ffffff',
          'white-soft': '#f8f8f8',
        },
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}