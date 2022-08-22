const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
      animation: {
        'ticker-loop': '20s infinite linear ticker-loop',
      },
      keyframes: {
        'ticker-loop': {
          '0%': {
            transform: 'translatex(0)',
          },
          '100%': {
            transform: 'translatex(-100%)',
          },
        },
      },
    },
  },
  plugins: [],
};
