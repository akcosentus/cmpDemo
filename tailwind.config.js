/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cosentus-cyan': '#17a2b8',
        'cosentus-cyan-light': '#1bb9d1',
        'navbar-dark': '#222',
      },
    },
  },
  plugins: [],
}
