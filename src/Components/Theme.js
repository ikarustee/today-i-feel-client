import { extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools";
const dark = "#1A202C";
const light = "#F7FAFC";


const theme = extendTheme({
    styles: {
      global: (props) => ({
        body: {
          bg: mode(light, dark)(props)
        }
      })
    },
    colors: {
      blue: {
        "50": "#E5EEFF",
        "100": "#85abff",
        "200": "#709dff",
        "300": "#5C90FF",
        "400": "#4782ff",
        "500": "#3374ff",
        "600": "#1f66ff",
        "700": "#0a58ff",
        "800": "#002166",
        "900": "#1c2947"
      },
      "purple": {
        "50": "#F5E9FC",
        "100": "#E2C1F5",
        "200": "#D099EF",
        "300": "#BE72E9",
        "400": "#AB4AE3",
        "500": "#9922DD",
        "600": "#7A1BB1",
        "700": "#5C1485",
        "800": "#3D0E58",
        "900": "#1F072C"
      }
    },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Work Sans, sans-serif',
  },
})

export default theme