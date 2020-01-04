import React, { useEffect, useRef } from 'react'
import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import 'styled-components/macro'

import store from 'store'
import Ticket from 'Ticket'

export default function Tickets() {
  const interval = useRef()
  const gameIsLive = useStoreState(({ game }) => game.isLive)

  const tickets = useStoreState(({ tickets }) => tickets.flying)

  useEffect(() => {
    if (gameIsLive) {
      interval.current = setInterval(store.getActions().tickets.throw, 2000)
    } else {
      clearInterval(interval.current)
      store.getActions().tickets.reset()
    }
  }, [gameIsLive])

  return (
    <Wrapper>
      {tickets.map(ticket => (
        <Ticket
          key={ticket.id}
          zIndex={ticket.id}
          target={ticket.target}
          css={`
            @keyframes fly {
              0% {
                transform: translate(${ticket.x}vw, ${ticket.y}vh);
              }
              100% {
                transform: translate(50vw, 50vh);
              }
            }
            animation-name: fly;
            animation-duration: ${ticket.timeout}ms;
            animation-fill-mode: forwards;
          `}
          onAnimationEnd={ticket.land}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
