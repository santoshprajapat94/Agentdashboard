/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors for light and dark themes
        light: {
          background: "#ffffff",
          text: "#1f2937", // Gray-800
          primary: "#4f46e5", // Indigo-600
          secondary: "#3b82f6", // Blue-500
        },
        dark: {
          background: "#1f2937", // Gray-800
          text: "#f9fafb", // Gray-100
          primary: "#6366f1", // Indigo-500
          secondary: "#60a5fa", // Blue-400
        },
      },
    },
  },
  darkMode: "class", // Enables class-based dark mode
  plugins: [require("tailwindcss-animate")],
};
