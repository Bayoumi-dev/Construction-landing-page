/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/*.html'],
   theme: {
      colors: {
         primary: {
            DEFAULT: '#18A7B9',
            light: '#17bbd1',
            trans: '#c7e6ff42',
         },
         secondary: '#313131',
         body: '#6B6B6B',
         white: '#FFFFFF',
         black: '#000000',
         orange: '#fe8534',
         green: '#43b918',
         gray: {
            DEFAULT: '#E8E8E8',
            light: '#F9F9F9',
         },
         error: '#ed2c49',
         transparent: 'transparent',
      },
      container: {
         center: true,
         screens: {
            lg: em(992),
            xl: em(1170),
         },
         padding: {
            DEFAULT: '1.75em',
            xl: '0',
         },
      },
      animationDelay: {
         100: '100ms',
         300: '300ms',
         500: '500ms',
         700: '700ms',
         900: '900ms',
      },
      extend: {
         screens: {
            xs: em(360),
            sm: em(640),
            md: em(768),
            lg: em(1024),
            xl: em(1280),
            '2xl': em(1400),
            '3xl': em(1600),
         },
         spacing: {
            15: '3.75rem',
            18: '4.5rem',
            30: '7.5rem',
            120: '30rem',
            inherit: 'inherit',
         },
         fontSize: {
            '2xs': '0.625rem',
         },
         maxWidth: {
            120: '30rem',
         },
         borderRadius: {
            curvy: '2.5rem 0.3125rem',
         },
         boxShadow: {
            btn: `0px 64.8148px 46.8519px rgba(24, 167, 185, 0.0759259), 
            0px 38.5185px 25.4815px rgba(24, 167, 185, 0.0607407), 
            0px 20px 13px rgba(24, 167, 185, 0.05), 
            0px 8.14815px 6.51852px rgba(24, 167, 185, 0.0392593), 
            0px 1.85185px 3.14815px rgba(24, 167, 185, 0.0240741)`,
            box: `0px 100px 80px rgba(56, 56, 56, 0.1), 
            0px 64.8148px 46.8519px rgba(56, 56, 56, 0.0759259), 
            0px 38.5185px 25.4815px rgba(56, 56, 56, 0.0607407), 
            0px 20px 13px rgba(56, 56, 56, 0.05), 
            0px 8.14815px 6.51852px rgba(56, 56, 56, 0.0392593), 
            0px 1.85185px 3.14815px rgba(56, 56, 56, 0.0240741)`,
            card: '0px 15px 30px rgba(198, 217, 225, 0.3)',
            autofill: 'inset 0 0 0 100px white!important',
         },
         backgroundSize: {
            '2/1': '200% 100%',
         },
         animation: {
            'fade-in': 'fadeIn 1.7s',
            pulse: ' pulse 1.5s ease-in-out',
            'scroll-horizontal': 'scrollHorizontal 10s linear infinite',
            'slide-up': 'slideUp 1.5s',
            'slide-right': 'slideRight 1.5s',
            'zoom-in': 'zoomIn 0.7s',
         },
         keyframes: {
            fadeIn: {
               from: {
                  opacity: 0,
               },
               to: {
                  opacity: 1,
               },
            },
            pulse: {
               '0%, 100%': {
                  transform: 'scale(1)',
               },
               '50%': {
                  transform: 'scale(1.06)',
               },
            },
            scrollHorizontal: {
               '0%': {
                  transform: 'translateX(0)',
               },
               '100%': {
                  transform: 'translateX(calc(-13rem * 5))',
               },
            },
            slideUp: {
               from: {
                  transform: 'translateY(50%)',
               },
               to: {
                  transform: 'translate(0)',
               },
            },
            slideRight: {
               from: {
                  transform: 'translateX(50%)',
               },
               to: {
                  transform: 'translate(0)',
               },
            },
            zoomIn: {
               from: {
                  transform: 'scale(0.5)',
               },
               to: {
                  transform: 'scale(1)',
               },
            },
         },
      },
   },
   plugins: [
      // Add animation delay utilities
      require('tailwindcss/plugin')(function ({ addUtilities, theme, e }) {
         addUtilities(
            Object.entries(theme('animationDelay')).map(([key, value]) => ({
               [`.${e(`animate-delay-${key}`)}`]: {
                  animationDelay: `${value}`,
               },
            }))
         )
      }),
   ],
}

/**
 * @description Pixel to em
 * @param {number} px - number in pixels
 * @returns {string} number in 'em' with its unit
 */
function em(px) {
   return `${px / 16}em`
}
