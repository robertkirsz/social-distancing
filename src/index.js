import React from 'react'
import { render } from 'react-dom'
import { StoreProvider } from 'easy-peasy'

import store from 'store'

import App from 'App'
import GlobalStyle from 'GlobalStyle'

render(
  <>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
    <GlobalStyle />
  </>,
  document.getElementById('root')
)
