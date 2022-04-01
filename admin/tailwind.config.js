module.exports = {
  content: ["./node_modules/flowbite/**/*.js", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sidebar-color": "#30419b",
        "input-color": "#F0F4F7",
        "siderbar-darker": "#192b84",
        "bg-color": "#F9F9F9",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
