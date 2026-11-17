/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07090C',
        surface: {
          DEFAULT: '#0D1117',
          light: '#161B22',
          lighter: '#21262D',
          glass: 'rgba(13, 17, 23, 0.7)',
        },
        teal: {
          DEFAULT: '#2DD4BF',
          glow: '#14B8A6',
          dark: '#0F766E',
          dim: 'rgba(45, 212, 191, 0.15)',
        },
        amber: {
          DEFAULT: '#F59E0B',
          glow: '#D97706',
          dim: 'rgba(245, 158, 11, 0.15)',
        },
        muted: {
          DEFAULT: '#94A3B8',
          dark: '#64748B',
          light: '#CBD5E1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'teal-glow': '0 0 25px -5px rgba(45, 212, 191, 0.3)',
        'teal-glow-lg': '0 0 50px -10px rgba(45, 212, 191, 0.4)',
        'amber-glow': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
