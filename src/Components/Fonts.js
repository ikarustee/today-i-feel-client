import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
          font-family: 'Work Sans';
          src: url('./fonts/WorkSans-Medium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
      }
      `}
  />
)

export default Fonts