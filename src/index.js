import React from 'react'
import { render } from 'react-dom'

import App from 'App'
import GlobalStyle from 'GlobalStyle'

render(
  <>
    <App />
    <GlobalStyle />
  </>,
  document.getElementById('root')
)
