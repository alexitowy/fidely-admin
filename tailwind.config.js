/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3f5e83',
          contrast: '#ffffff',
          shade: '#375373',
          tint: '#526e8f',
        },
        secondary: {
          DEFAULT: '#7698c1',
          contrast: '#ffffff',
          shade: '#6886aa',
          tint: '#84a2c7',
        },
        tertiary: {
          DEFAULT: '#FFBE98',
          contrast: '#ffffff',
          shade: '#e0a786',
          tint: '#ffc5a2',
        },
        links: {
          DEFAULT: '#3b82f6',
        },
        success: {
          DEFAULT: '#7cda95',
          contrast: '#454a48',
          shade: '#6dc083',
          tint: '#d3efe2',
        },
        warning: {
          DEFAULT: '#F7A072',
          contrast: '#ffffff',
          shade: '#d98d64',
          tint: '#f8aa80',
        },
        danger: {
          DEFAULT: '#f35361',
          contrast: '#ffffff',
          shade: '#d64955',
          tint: '#f46471',
        },
      },
      spacing: {
        '1': '5px',
        '2': '10px',
        '3': '15px',
        '4': '20px',
        '5': '25px',
        '6': '30px',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
      },
      fontWeight: {
        light: '300',
        normal: '500',
        bold: '700',
        extraBold: '900',
      },
      borderRadius: {
        'none': '0',
        'sm': '5px',
        'DEFAULT': '10px',
        'md': '15px',
        'lg': '20px',
      },
      boxShadow: {
        'custom-light': '0px 4px 6px 3px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [],
}

