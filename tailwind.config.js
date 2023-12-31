/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      danger: '#dc2626',
      warning: '#d97706',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
      },
      mantis: {
        50: '#f6faf3',
        100: '#e9f5e3',
        200: '#d3eac8',
        300: '#afd89d',
        400: '#82bd69',
        500: '#61a146',
        600: '#4c8435',
        700: '#3d692c',
        800: '#345427',
        900: '#2b4522',
        950: '#13250e',
      },
    },
  },
  plugins: [],
}
