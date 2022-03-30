import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
      blue: {
        "50": "#E5EEFF",
        "100": "#B8CEFF",
        "200": "#8AAFFF",
        "300": "#5C90FF",
        "400": "#2E71FF",
        "500": "#0051FF",
        "600": "#0041CC",
        "700": "#003199",
        "800": "#002166",
        "900": "#001033"
      }
    },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Work Sans, sans-serif',
  },
})

export default theme