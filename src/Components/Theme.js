import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
      blue: {
        "50": "#99b9ff",
        "100": "#85abff",
        "200": "#709dff",
        "300": "#5C90FF",
        "400": "#4782ff",
        "500": "#3374ff",
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