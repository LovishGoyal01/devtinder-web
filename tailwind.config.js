module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        devtinder: {
          "primary": "#ff3366",
          "secondary": "#1e293b",
          "accent": "#fbbf24",
          "neutral": "#f3f4f6",
          "base-100": "#fff",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e42",
          "error": "#ef4444",
        },
      },
      "light",
      "dark"
    ],
  },
} 