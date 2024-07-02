/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      satoshi: ["Kommon-Grotesk", "sans-serif"],
    },
    colors: {
      main: "#BDFFBE",

      warningText: "#FF7300",
      error: "#d90b04",

      bgColor: "#000",
    },
    borderRadius: {
      default: "14px",
      20: "20px",
      12: "12px",
      10: "10px",
      8: "8px",
      6: "6px",
      small: "4px",
    },
    extend: {
      fontSize: {
        large: ["28px", "28px"],
        largeTitle: ["24px", "24px"],
        title: ["20px", "20px"],
        smallTitle: ["18px", "18px"],
        subtitle: ["14px", "14px"],
        small: ["12px", "12px"],
        xxs: "10px",
      },
      spacing: {
        bottomBar: "85px",
      },
      fontWeight: {
        850: "850",
        800: "800",
        600: "600",
        500: "500",
        400: "400",
      },
      backgroundImage: {
        bgAuth: "url('/images/bg_auth.jpg')",
        backgroundIcon: "url('/icons/background_icon.png')",
      },
      boxShadow: {
        shadow25: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
    zIndex: {
      0: "0",
      1: "1",
      2: "2",
    },
  },
  plugins: [],
}
