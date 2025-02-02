// File: tailwind.config.js
// Tailwind CSS configuration
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pd-blue': '#1E40AF',
        'pd-yellow': '#EAB308',
        'pd-purple': '#7E22CE',
      }
    }
  },
  plugins: []
}