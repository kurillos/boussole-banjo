import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}", // On ajoute le dossier sanity au cas où
  ],
  theme: {
    extend: {
      colors: {
        'bourbon': '#4E3524',
        'dusty-road': '#D2B48C',
        'denim-faded': '#5D7785',
        'old-paper': '#F5F5DC',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'], 
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config