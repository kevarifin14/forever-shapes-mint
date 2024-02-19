const colors = {
  alabaster: {
    50: "#fafafa",
    100: "#efefef",
    200: "#dcdcdc",
    300: "#bdbdbd",
    400: "#989898",
    500: "#7c7c7c",
    600: "#656565",
    700: "#525252",
    800: "#464646",
    900: "#3d3d3d",
    950: "#292929",
  },
  black: {
    50: "#f6f6f6",
    100: "#e7e7e7",
    200: "#d1d1d1",
    300: "#b0b0b0",
    400: "#888888",
    500: "#6d6d6d",
    600: "#5d5d5d",
    700: "#4f4f4f",
    800: "#454545",
    900: "#3d3d3d",
    950: "#000000",
  },
};

const primaryColor = colors.black;
const primary = {
  light: primaryColor[900],
  DEFAULT: primaryColor[950],
  dark: primaryColor[950],
  ...primaryColor,
};

const lightColor = colors.alabaster;
const light = {
  light: "#ffffff",
  DEFAULT: lightColor[50],
  dark: lightColor[100],
  accent: lightColor[300],
  ...lightColor,
};

const darkColor = colors.black;
const dark = {
  accent: darkColor[600],
  light: darkColor[800],
  DEFAULT: darkColor[900],
  dark: darkColor[950],
  ...darkColor,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*"],
  theme: {
    extend: {
      colors: {
        primary,
        light,
        dark,
        ...colors,
      },
    },
  },
  darkMode: "class",
};
