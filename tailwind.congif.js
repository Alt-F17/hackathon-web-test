module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media'
    theme: {
      extend: {
        colors: {
          green: {
            400: '#34D399',
            500: '#10B981',
          },
          gray: {
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
        },
        fontFamily: {
          mono: ['Courier New', 'monospace'],
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };