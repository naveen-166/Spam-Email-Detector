// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths as needed
  ],
  theme: {
    extend: {
      // Add custom scrollbar utilities
      scrollbar: {
        'hide': 'scrollbar-width: none; -ms-overflow-style: none; ::-webkit-scrollbar { display: none; }',
      },
      // You can add more customizations here if needed
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities(
        {
          // Custom utilities for hiding scrollbars
          '.hide-scrollbar': {
            /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
            '::-webkit-scrollbar': {
              display: 'none',
            },
            /* Hide scrollbar for Firefox */
            'scrollbar-width': 'none',
            /* Hide scrollbar for IE and Edge */
            '-ms-overflow-style': 'none',
          },
          // Custom utilities for text wrapping
          '.break-words': {
            'overflow-wrap': 'break-word',
            'word-break': 'break-word',
            'hyphens': 'auto',
          },
        },
        ['responsive', 'hover'] // Optional: add variants if needed
      )
    }
  ],
};
