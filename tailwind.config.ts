import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1e3a5f',
        'primary-light': '#2d5086',
        'accent': '#d4a017',
        'accent-light': '#e8b820',
        'success': '#16a34a',
        'warning': '#d97706',
        'danger': '#dc2626',
        'surface': '#f8fafc',
        'card': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
