import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import styled from 'styled-components'

// TODO: pause when switching tabs

export default function GameControllerButton() {
  const gameIsLive = useStoreState(({ game }) => game.isLive)
  const startGame = useStoreActions(({ game }) => game.start)
  const stopGame = useStoreActions(({ game }) => game.stop)

  function handleClick() {
    gameIsLive ? stopGame() : startGame()
  }

  return <Button onClick={handleClick}>{gameIsLive ? 'Stop' : 'Start'}</Button>
}

const Button = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
`
