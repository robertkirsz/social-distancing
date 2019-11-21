import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    margin: 0;
    font: 16px sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    user-select: none;
    cursor: default;
  }
`
