module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/3": "33%",
      "1/2": "50%",
      "2/3": "66%",
      "3/4": "75%",
      "4/5": "80%",
      full: "100%",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
