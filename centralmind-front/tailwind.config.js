/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screen:{
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
     
      borderWidth: {
        "1": "1px",
        "3": "3px",
        "6": "6px",
      },
      zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1',
      },
      screens: {
        "2xl": { max: "1300px" },
        print: { raw: "print" },
        // => @media  print { ... }
      },
    },
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: "#000",
      om: {
        primary: "#5533ff",
        secondary: '#4c647a',

      },
    },
  },
  plugins: [],
}