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
      keyframes: {
        'blink-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'underline-reveal': {
          from: { transform: 'scaleX(0) rotate(-1deg)' },
          to: { transform: 'scaleX(1) rotate(-1deg)' },
        },
      },
      animation: {
        'blink-cursor': 'blink-cursor 0.7s step-end infinite',
        'underline-reveal': 'underline-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
