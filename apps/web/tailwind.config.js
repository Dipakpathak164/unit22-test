/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@monorepo/config/tailwind.preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
