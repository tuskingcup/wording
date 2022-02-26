module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
          keyframes: {
              'fade-in-down': {
                  '0%': {
                      opacity: '0',
                  },
                  '100%': {
                    opacity: '1',
                },
              },
          },
          animation: {
              'fade-in-down': 'fade-in-down 0.5s ease-in',
          },   
      },
  },
    plugins: [require('daisyui'),("tailwindcss-animation-delay")],
  }