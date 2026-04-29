import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
          display: 'flex',
          padding: '24px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '32px',
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      fontSize: {
        body2: "0.75rem", // 12px
        body1: "1rem", // 16px
        heading3: "1.5rem", // 24px
        heading2: "1.75rem", // 28px
        heading1: "2.25rem", // 36px
      },
      colors: {
        primary: {
          DEFAULT: "#08B6D5",
          darker: "#0E7491",
          lighter: "#9BEDFC",
          subtle: "#90C5CE",
        },
        error: {
          DEFAULT: "#FF3B3B",
          darker: "#E53535",
          lighter: "#FF5C5C",
          subtle: "#FF8080",
        },
        warning: {
          DEFAULT: "#FFCC00",
          darker: "#E5B800",
          lighter: "#FDDD48",
          subtle: "#FDED72",
        },
        success: {
          DEFAULT: "#06C270",
          darker: "#05A660",
          lighter: "#39D98A",
          subtle: "#56EBA0",
        },
        dark: {
          1: "#1A1A1A",
          2: "#5B5F67",
          3: "#8F90A6",
          4: "#C7C9D9",
        },
        light: {
          1: "#DDE5E9",
          2: "#EBEBF0",
          3: "#FAFAFC",
          4: "#FDFDFF",
        },
        ourservices: {
          // developer custom colours
          bg1: "#9AD2FB",
          font1: "#0043BE",
          bg2: "#FFF280",
          font2: "#C1A200",
          bg3: "#FCA0A0",
          font3: "#CD2828",
          bg4: "#C1F4B5",
          font4: "#146200",
        },
      },
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [],
  },
}
