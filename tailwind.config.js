// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5e9ff',
          100: '#e6ccff',
          200: '#d1a6ff',
          300: '#b980ff',
          400: '#a157ff',
          500: '#8a2be2', // Main Purple
          600: '#7325c2',
          700: '#5d1ea3',
          800: '#481884',
          900: '#330f66',
        },
        secondary: {
          50: '#ffe6f7',
          100: '#ffcced',
          200: '#ff99db',
          300: '#ff66c9',
          400: '#ff33b8',
          500: '#ff00aa', // Main Pink
          600: '#e60097',
          700: '#cc0084',
          800: '#b30071',
          900: '#99005e',
        },
        accent: {
          500: '#ff4df5', // Bright accent (optional)
          600: '#e044d9',
        },
        error: {
          500: '#e3342f',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 6px 10px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
