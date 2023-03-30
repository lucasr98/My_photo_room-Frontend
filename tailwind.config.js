/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        colorA1: {
          100: "rgb(var(--color_a1) / 1)"
        },
        colorB1: {
          100: "rgb(var(--color_b1) / 1)"
        },
        colorC1: {
          100: "rgb(var(--color_c1) / 1)"
        },
        colorD1: {
          100: "rgb(var(--color_d1) / 1)"
        },
        colorE1: {
          100: "rgb(var(--color_e1) / 1)"
        },
        colorF1: {
          100: "rgb(var(--color_f1) / 1)"
        },
        colorRed1: {
          100: "rgb(var(--color_red1) / 1)"
        },
        colorOrange: {
          100: "rgb(var(--color_orange) / 1)"
        },
        colorYellow: {
          100: "rgb(var(--color_yellow) / 1)"
        },
        colorGreen: {
          100: "rgb(var(--color_green) / 1)"
        },
        colorSkyblue: {
          100: "rgb(var(--color_skyblue) / 1)"
        },
        colorBlue: {
          100: "rgb(var(--color_blue) / 1)"
        },
        colorPurple: {
          100: "rgb(var(--color_purple) / 1)"
        },
        colorRed2: {
          100: "rgb(var(--color_red2) / 1)"
        },
        color__link: {
          100: "rgb(var(--color_orange) / 1)"
        },
        color__sucess: {
          100: "rgb(var(--color_blue) / 1)"
        },
        color__danger: {
          100: "rgb(var(--color_red1) / 1)"
        }
      }
    },
  },
  plugins: [],
}
