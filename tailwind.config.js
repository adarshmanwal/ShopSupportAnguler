module.exports = {
  purge: ['./src/**/*.{html,ts,css,scss,sass,less,styl}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      }
    }
  },
  variants: {
    extend: {
      width: ['hover']
    }
  },
  plugins: [],
}