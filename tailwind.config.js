/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    // Adicione estas animações
    keyframes: {
      'pop-out': {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '100%': { transform: 'scale(2)', opacity: '0' },
      }
    },
    animation: {
      // Nome da classe utilitária: 'animate-pop-out'
      'pop-out': 'pop-out 0.5s ease-out forwards',
    }
  }
  },
}