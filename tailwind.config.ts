import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#111111',
          gray: '#F9FAFB',
          lime: '#D2F558',
          limeDark: '#C1E645',
          limeText: '#5A7A00',
        },
      },
      boxShadow: {
        'soft-xl': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'soft-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        glow: '0 0 20px rgba(210, 245, 88, 0.5)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
