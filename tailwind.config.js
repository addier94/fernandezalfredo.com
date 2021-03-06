module.exports = {
  theme: {
    fontFamily: {
      sans: ['Montserrat-400'],
      serif: ['Montserrat-700'],
      mono: ['Montserrat-900'],
    },
    extend: {
      fontFamily: {
        'mono-400': ['Roboto-400'],
      },
      boxShadow: {
        code: '0 1px 1px rgb(0 0 0 / 8%)',
      },
      colors: {
        primary: '#5f7fff',
        dark: '#191919',
        'primary-light': '#f8f9fc',
        // secondary: '#f8f9fc',
        'yellow-main': {
          300: '#beb950',
          500: '#f1e05a',
        },
        'green-main': {
          100: '#ebffeb',
          400: '#4fc08d',
          600: '#9bd681',
          700: '#81a78f',
          '700-40': '#81a78f47',
          800: '#435d4c',
        },
        'gray-main': {
          50: '#ebf4f1',
          100: '#f5f5f5',
          200: '#eaecef',
          300: '#e4e4e4',
          350: '#E5E5E5',
          400: '#e7e9db',
          600: '#586069',
          700: '#808080',
          750: '#444444',
          800: '#313131',
          950: '#1a1a1a',
        },
        'blue-main': {
          300: '#09f',
          400: '#1f8ed5',
          500: '#526488',
          600: '#0366d6',
          700: '#35495e',
          750: '#1f8ed540',
          800: '#2c3e50',
          900: '#243746',
          950: '#091a28',
        },
      },
      borderWidth: {
        6: '6px',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  experimental: {
    darkModeVariant: true,
  },
  dark: 'class',
}
