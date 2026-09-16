/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanic: {
          50: '#f2f7f4',
          100: '#e3ece6',
          200: '#c5d8cd',
          300: '#9cbdac',
          400: '#6d9c84',
          500: '#4d8066',
          600: '#3a6651',
          700: '#2f5242',
          800: '#243e32',
          900: '#182921',
          950: '#0c1611',
        },
        gold: {
          100: '#f8f4ec',
          200: '#efe6d4',
          300: '#dfcba8',
          400: '#d0b37e',
          500: '#c5a880',
          600: '#b59265',
          700: '#94734c',
          800: '#765b3d',
        },
        terracotta: {
          50: '#fcf6f3',
          100: '#f7ebe4',
          200: '#eed4c6',
          300: '#e0b49f',
          400: '#d18d72',
          500: '#c97a53',
          600: '#b8613c',
          700: '#984d2f',
          800: '#7a402a',
        },
        cream: {
          50: '#fdfbf7',
          100: '#f9f6f0',
          200: '#f2ecdf',
          300: '#e7ddc9',
        },
        charcoal: {
          800: '#222222',
          900: '#161616',
          950: '#0d0d0d',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0,0,0,0.07)',
        'luxury': '0 20px 40px -15px rgba(24, 41, 33, 0.12)',
        'glow': '0 0 25px rgba(197, 168, 128, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
