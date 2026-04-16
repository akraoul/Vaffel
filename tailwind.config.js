/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF9400',
        'secondary': '#D4D4DC',
        'dark': '#303030',
        'white': '#FFFFFF',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'custom': ['TT Firs Neue', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FF9400, 0 0 10px #FF9400, 0 0 15px #FF9400' },
          '100%': { boxShadow: '0 0 10px #FF9400, 0 0 20px #FF9400, 0 0 30px #FF9400' },
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
