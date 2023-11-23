/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'max': '739px' },
      'md': { 'min': '740px', 'max': '1023px' },
      // => @media (min-width: 1024px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        grey: '#333',
        'solid-b': '#e8ebed',
        'search': '#000',
        'custom-via': '#6828fa',
        'custom-pink': '#FFBAA4',
        'custom-blue': '#2877FA',
        'dark-purple':'#6717CD',
        'text-color-light': '#757575',
        'text-color': '#333',
        'primary-color': '#f05123',
        'gray-color': '#666'
      },
      fontSize: {
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
        '16px': '16px',
        '17px': '17px',
      },
      borderRadius:{
        '20xl': '20px',
      }, 
      zIndex: {
        '9999': '9999',
        '1': '1',
        '2': '2',
      },
      boxShadow: {
        '2xl': '0 -4px 32px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        wiggle: {
          '0%': { opacity: 0, transform: 'translateY(-8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        'nav_ani': 'wiggle .3s ease',
      },
      width: {
        '9.5' : '38px',
        '6.5' : '26px',
      },
      height: {
        '9.5' : '38px',
        '6.5' : '26px',
      },
      margin: {
        '-12': '-12px',
        '15': '60px',
        '17' : '70px',
        '17.5' : '70px',
        '7.5':'30px',
        '18.5' : '74px',
      },
      padding: {
        '-12': '-12px',
        '15': '60px',
        '7.5':'30px',
        '17' : '70px',
        '17.5' : '70px',
        '18.5' : '74px',
      },
    },
  },
  plugins: [],
}