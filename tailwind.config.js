module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#F6FAF3',
          2: '#EAF5E3',
          3: '#D4EBC7',
          4: '#B3D99C',
          5: '#88BF68',
          6: '#67A344',
          7: '#518633',
          8: '#416A2B',
          9: '#365526',
          10: '#2D4621',
          11: '#16250E',
        },
      },
      fontSize: {
        '24px': '24px',
        '20px': '20px',
        '17px': '17px',
        '16px': '16px',
        '13px': '13px',
      },
      animationDelay: {
        275: '275ms',
        5000: '5s',
      },
      animationDuration: {
        2000: '2s',
        'long': '10s',
        'very-long': '20s',
      },
      fontFamily: {
        Roboto: ["Roboto", "system-ui"],
        NotoSerif: ["Kantumruy Pro", "serif"]
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
