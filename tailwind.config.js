module.exports = {
  purge: {
    content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
  ]},
  theme: {
    zIndex:{
      '100': 100
    },
    colors: {
      red: {
        default: "#ED2737",
        lighter: "#ea2027",
        lightest: "#fed7d7",
        darker: "#e91f26",
        darkest: "#9e0000",
      },
      grey: {
        lighter: "#f7f7f7",
        default: "#808080",
        darker: "#2D2D2D",
        inputText: "#a0aec0",
      },
      black: {
        default: "#000000",
        lighter: "#0f0f0f",
        lightest: "#707070",
      },
      white: {
        default: "#ffffff",
        cream: "#fdf8f0",
      },
      whiteSmoke: {
        default: "#fafafa",
      },
    },
    boxShadow: {
      default: "0px 4px 4px rgba(206, 206, 206, 0.25);",
      custom:
        "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
    },
    screens: {
      xsm: "375px",
      sm:"550px",
      md: "768px",
      lg: "1024px",
      xl:'1150px',
      xxl: "1400px",
    },
    inset: {
      "0": "0",
      auto: "auto",
      "1/2": "50%",
      "1/4": "25%",
    },
    maxWidth: {
      "9/10": "95%",
    },
    minWidth: {
      "0": "0px",
      "50": "50px",
    },
    extend: {},
    fontWeight:{
      normal: 400,
      medium:500,
      semibold:600,
      bold:700,
      extrabold:800
    }
  },
  variants: {},
  plugins: [],
};
