import React from 'react'
import styled, { css } from 'styled-components'

const rotations = {
  UP: 0,
  'UP-RIGHT': 45,
  RIGHT: 90,
  'DOWN-RIGHT': 135,
  DOWN: 180,
  'DOWN-LEFT': 225,
  LEFT: 270,
  'UP-LEFT': 315
}

export default function Player({ direction }) {
  return (
    <Wrapper>
      <Arrow direction={direction}>{'↑'}</Arrow>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  min-height: 100px;
  margin: auto;
  border: 2px solid;
  border-radius: 4px;
`

const Arrow = styled.span`
  font-size: 40px;

  ${({ direction }) => css`
    ${!direction && 'display: none;'}
    transform: rotate(${rotations[direction] || 0}deg);
  `}
`
