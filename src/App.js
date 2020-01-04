import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'
import styled from 'styled-components'
import 'styled-components/macro'

import Score from 'Score'
import Lives from 'Lives'
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
  const updateScore = useStoreActions(({ score }) => score.update)

  const [up, setUp] = useState(false)
  const [right, setRight] = useState(false)
  const [down, setDown] = useState(false)
  const [left, setLeft] = useState(false)
  const [last, setLast] = useState(null)

  const [gameHasStarted, setGameHasStarted] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (!arrowKeys.includes(event.key)) return
      event.preventDefault()
      if (event.key === 'ArrowUp') setUp(true)
      if (event.key === 'ArrowRight') setRight(true)
      if (event.key === 'ArrowDown') setDown(true)
      if (event.key === 'ArrowLeft') setLeft(true)
      setLast(keyToDirectionMap[event.key])
    })

    document.addEventListener('keyup', event => {
      if (!arrowKeys.includes(event.key)) return
      event.preventDefault()
      if (event.key === 'ArrowUp') setUp(false)
      if (event.key === 'ArrowRight') setRight(false)
      if (event.key === 'ArrowDown') setDown(false)
      if (event.key === 'ArrowLeft') setLeft(false)
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
    !up && !right && !down && !left ? null :
    last

  return (
    <Wrapper>
      <Score />
      <Lives />

      {gameHasStarted && (
        <Tickets direction={direction} onDeflect={updateScore} />
      )}

      <Player direction={direction} />

      {!gameHasStarted && (
        <button
          onClick={() => setGameHasStarted(true)}
          css="position: absolute; bottom: 200px; left: 50%; transform: translateX(-50%);"
        >
          Start
        </button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`
