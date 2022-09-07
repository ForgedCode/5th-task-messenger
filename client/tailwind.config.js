/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "JIT",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
