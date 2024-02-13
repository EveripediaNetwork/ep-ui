import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#ffe5f1',
          100: '#ffcce4',
          150: '#F7FAFC',
          200: '#ffb3d7',
          300: '#ff99ca',
          400: '#ff80bd',
          500: '#FF5CAA',
          600: '#ff4da3',
          700: '#ff3396',
          800: '#ff1a88',
          900: '#5d1738',
        },
        gray: {
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923',
        },
        alpha: {
          50: '#ffffff0a',
          100: '#ffffff0f',
          200: '#ffffff14',
          300: '#ffffff29',
          400: '#ffffff3d',
          500: '#ffffff5C',
          600: '#ffffff7a',
          700: '#ffffffa3',
          800: '#ffffffcc',
          900: '#ffffffeb',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        montserrat: ['var(--montserrat-font)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
