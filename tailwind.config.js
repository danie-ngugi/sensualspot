const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  // darkMode: 'media',
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-1': '#420000',
        'accent-1': '#485460',
        'secondary-1': '#d35400',
        'gray-1':  '#1a1a1a',
        primary: colors.orange,
        accent: colors.amber,
        secondary: colors.gray,
        complementary: colors.amber,
        neutral: colors.slate,
        // 'true-gray': colors.trueGray,
        // 'emerald': colors.emerald,

      },
      width: {
        'square-diagonal': (Math.sqrt(2) * 100).toFixed(2) + '%'
      },
      animation: {
        blob: "blob 7s infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.2)"
          },
          "66%": {
            transform: "translate(-30px, 20px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)"
          }
        }
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
