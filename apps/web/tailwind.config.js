const config = require('tailwind-config/tailwind.config.js');

module.exports = {
  ...config,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  extends: {},
};
