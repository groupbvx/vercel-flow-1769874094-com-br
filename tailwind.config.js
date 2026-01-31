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
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EBF2FE',
          100: '#D7E6FD',
          200: '#AFCDFB',
          300: '#87B4F9',
          400: '#5F9BF7',
          500: '#3B82F6',
          600: '#0B61EE',
          700: '#084BB8',
          800: '#063582',
          900: '#041F4C',
        },
        secondary: {
          DEFAULT: '#10B981',
          50: '#E6FBF4',
          100: '#CDF7E9',
          200: '#9BEFD3',
          300: '#69E7BD',
          400: '#37DFA7',
          500: '#10B981',
          600: '#0D9668',
          700: '#0A734F',
          800: '#075036',
          900: '#042D1E',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          50: '#F3EFFE',
          100: '#E7DFFD',
          200: '#CFBFFB',
          300: '#B79FF9',
          400: '#9F7FF7',
          500: '#8B5CF6',
          600: '#6B2CF3',
          700: '#5011D9',
          800: '#3D0DA6',
          900: '#2A0973',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
