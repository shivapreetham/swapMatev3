// tailwind.config.js
import daisyui from "daisyui"

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // Add this line
  ],
};
