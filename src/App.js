import React, { useEffect } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'

import { attachKeyboardListeners } from 'store'

import Score from 'Score'
import Lives from 'Lives'
import Tickets from 'Tickets'
import Player from 'Player'
import TouchArea from 'TouchArea'
import GameControllButton from 'GameControllButton'
import Settings from 'Settings'

export default function App() {
  useEffect(() => {
    attachKeyboardListeners()
  }, [])

  return (
    <Wrapper>
      <Score />
      <Lives />
      <Player />
      <Tickets />
      <TouchArea />
      <GameControllButton />
      <Settings />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
