/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
       fontFamily: {
        'basis': ['Basis Grotesque Pro', 'sans-serif'],
      },
      maxWidth: {
        '400': '400px',
        
      },
      colors: {
        'blue-light': '#316FEA',
        'grey': '#BEC5CC'
     
      },
    },
  },
  plugins: [],
}

