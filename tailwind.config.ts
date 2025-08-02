// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Custom primary color
        primaryBlack: "#171717",
        secondary: "#FBBF24", // Custom secondary color
        fontColor: "#555555",
        customBlack: "#262626", // Custom background color
        // Add more custom colors as needed
        error: "#FF0000", // Custom error color
        hoverError: "#FF6347", // Custom hover error color
        success: "#00FF00", // Custom success color
        warning: "#FFA500", // Custom warning color
        info: "#00CED1", // Custom info color
      },
      spacing: {
        "128": "32rem", // Custom spacing
        "144": "36rem",
        // Add more custom spacing as needed
      },
      // Add more customizations as needed
    },
  },
  variants: {},
  plugins: [],
};
