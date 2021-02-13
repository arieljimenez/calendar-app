export default {
  breakpoints: ['600px', '768px', '960px', '1280px'],
  fontSizes: [8, 12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    sanMarino: '#4c73b1',
    kashmirBlue: '#373F55',
    lightgray: '#f6f6ff',
    slategray: '#768192',
    almostBlack: '#232323',
    danger: '#e55353',
    warning: '#f9b115',
    info: '#3399ff',
    success: '#2eb85c',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)'
  },
  link: {
    color: 'blue',
    textDecoration: 'none',

    ':hover': {
      textDecoration: 'underline',
    },
  },
  variants: {},
  text: {
    normal: 300,
    bold: 700,
  },
}
