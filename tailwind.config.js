/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#ff4800',
        'gray-bg': '#939393',
        'dark-brown': '#230900',
        'green-dark': '#125400',
        'gray-light': '#F0F0F0',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #230900, 0 0 10px #230900, 0 0 15px #230900' },
          '100%': { boxShadow: '0 0 10px #230900, 0 0 20px #230900, 0 0 30px #230900' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropFilter: {
        'blur': 'blur(8px)',
      },
    },
  },
  plugins: [],
}
