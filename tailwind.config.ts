import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f6ff",
          100: "#e5ecff",
          200: "#cdd9ff",
          300: "#a9bdff",
          400: "#7d98ff",
          500: "#5674ff",
          600: "#3f56f2",
          700: "#3345c7",
          800: "#2c3aa3",
          900: "#273382"
        }
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)"
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
export default config;