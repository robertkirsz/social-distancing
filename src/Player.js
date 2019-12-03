import React from 'react'
import styled from 'styled-components'

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

// prettier-ignore
const avatars = [
  '👩‍💻', '👩🏻‍💻', '👩🏼‍💻', '👩🏽‍💻', '👩🏾‍💻', '👩🏿‍💻',
  '🧑‍💻', '🧑🏻‍💻', '🧑🏼‍💻', '🧑🏽‍💻', '🧑🏾‍💻', '🧑🏿‍💻',
  '👨‍💻', '👨🏻‍💻', '👨🏼‍💻', '👨🏽‍💻', '👨🏾‍💻', '👨🏿‍💻',
]

const hands = ['✋', '✋🏻', '✋🏼', '✋🏽', '✋🏾', '✋🏿']

export default function Player({ direction }) {
  return (
    <Wrapper>
      <Hand direction={direction}>{hands[0]}</Hand>
      {/* <Hand direction="UP">{hands[0]}</Hand>
      <Hand direction="UP-RIGHT">{hands[0]}</Hand>
      <Hand direction="RIGHT">{hands[0]}</Hand>
      <Hand direction="DOWN-RIGHT">{hands[0]}</Hand>
      <Hand direction="DOWN">{hands[0]}</Hand>
      <Hand direction="DOWN-LEFT">{hands[0]}</Hand>
      <Hand direction="LEFT">{hands[0]}</Hand>
      <Hand direction="UP-LEFT">{hands[0]}</Hand> */}
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
  border: 1px solid;
`

const Hand = styled.span`
  position: absolute;
  font-size: 40px;
  ${({ direction }) => styles[direction] || 'display: none;'}
`

const Avatar = styled.span`
  font-size: 100px;
`
