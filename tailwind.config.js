/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'aot',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/widgets/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/entities/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#0006BB',
      primaryLight: '#898DFF',
      primaryDark: '#1F215E',
      secondary: '#EEEFFF',
      secondaryDark: '#E4E1FF',
      lightgray: '#6B6B6B',
      gray: '#979797',
      white: '#FFFFFF',
      black: '#000',
      darkened: '#2E2E2E'
    },
    extend: {
    },
  },
  plugins: [],
}
