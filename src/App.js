import React, { useEffect } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'

import { attachKeyboardListeners } from 'store'

import Score from 'Score'
import Lives from 'Lives'
import Tickets from 'Tickets'
import Player from 'Player'
import GameControllButton from 'GameControllButton'

export default function App() {
  useEffect(() => {
    attachKeyboardListeners()
  }, [])

  return (
    <Wrapper>
      <Score />
      <Lives />
      <Tickets />
      <Player />
      <GameControllButton />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`
