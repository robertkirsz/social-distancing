import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Score from 'Score'
import Tickets from 'Tickets'
import Player from 'Player'

const arrowKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']

const keyToDirectionMap = {
  ArrowUp: 'UP',
  ArrowRight: 'RIGHT',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT'
}

export default function App() {
  const [up, setUp] = useState(false)
  const [right, setRight] = useState(false)
  const [down, setDown] = useState(false)
  const [left, setLeft] = useState(false)
  const [last, setLast] = useState(null)

  const [score] = useState(0)

  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => {
      if (!arrowKeys.includes(key)) return
      if (key === 'ArrowUp') setUp(true)
      if (key === 'ArrowRight') setRight(true)
      if (key === 'ArrowDown') setDown(true)
      if (key === 'ArrowLeft') setLeft(true)
      setLast(keyToDirectionMap[key])
    })

    document.addEventListener('keyup', ({ key }) => {
      if (!arrowKeys.includes(key)) return
      if (key === 'ArrowUp') setUp(false)
      if (key === 'ArrowRight') setRight(false)
      if (key === 'ArrowDown') setDown(false)
      if (key === 'ArrowLeft') setLeft(false)
    })
  }, [])

  // prettier-ignore
  const direction =
     up && !right && !down && !left ? 'UP' :
     up &&  right && !down && !left ? 'UP-RIGHT' :
    !up &&  right && !down && !left ? 'RIGHT' :
    !up &&  right &&  down && !left ? 'DOWN-RIGHT' :
    !up && !right &&  down && !left ? 'DOWN' :
    !up && !right &&  down &&  left ? 'DOWN-LEFT' :
    !up && !right && !down &&  left ? 'LEFT' :
     up && !right && !down &&  left ? 'UP-LEFT' :
     up && !right &&  down && !left ? last :
    !up &&  right && !down &&  left ? last :
    null

  return (
    <Wrapper>
      <Score>{score}</Score>
      <Tickets direction={direction} />
      <Player direction={direction} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
