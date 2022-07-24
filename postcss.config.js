module.exports = {
    plugins: {
       'tailwindcss/nesting': {},
       tailwindcss: {},
       // Plugins used in the production environment
       ...(process.env.NODE_ENV === 'production' && {
          autoprefixer: {},
          cssnano: {},
       }),
    },
 }  