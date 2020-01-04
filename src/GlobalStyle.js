import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    display: flex;
    margin: 0;
    font: 16px sans-serif;
  }

  #root {
    flex: 1;
    display: flex;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    user-select: none;
    cursor: default;
  }
`
