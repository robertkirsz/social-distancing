import React from 'react'
import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import 'styled-components/macro'

import { avatars, hands } from 'stuff'

// prettier-ignore
const styles = {
  UP: 'top: -15px; transform: rotateZ(90deg) rotateY(0);',
  'UP-RIGHT': 'top: -10px; right: -10px; transform: rotateZ(-45deg) rotateY(180deg);',
  RIGHT: 'right: -15px; transform:  rotateZ(0) rotateY(180deg);',
  'DOWN-RIGHT': 'bottom: -10px; right: -10px; transform: rotateZ(45deg) rotateY(180deg);',
  DOWN: 'bottom: -15px; transform: rotateZ(0) rotateY(0);',
  'DOWN-LEFT': 'bottom: -10px; left: -10px; transform: rotateZ(315deg) rotateY(0);',
  LEFT: 'left: -15px; transform: rotateZ(0) rotateY(0);',
  'UP-LEFT': 'top: -10px; left: -10px; transform: rotateZ(45deg) rotateY(0);'
}

export default function Player() {
  const direction = useStoreState(state => state.hand.direction)

  return (
    <Wrapper>
      <Hand css={styles[direction] || 'display: none;'}>{hands[0]}</Hand>
      <Avatar>{avatars[0]}</Avatar>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: relative;
`

const Hand = styled.span`
  position: absolute;
  font-size: 40px;
`

const Avatar = styled.span`
  font-size: 100px;
`
