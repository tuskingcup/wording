module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
<<<<<<< HEAD
    extend: {},
  },
=======
    extend: {
        keyframes: {
            'fade-in-down': {
                '0%': {
                    opacity: '0',
                },
                '100%': {
                    opacity: '1',
                },
            }
        },
        animation: {
            'fade-in-down': 'fade-in-down 0.5s ease-out'
        }
    },
},
>>>>>>> b81e84c26ac7d29eaf3908840677c3114d2c0c12
  plugins: [require('daisyui'),],
}
