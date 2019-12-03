import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'

import Ticket from 'Ticket'

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// prettier-ignore
const coordinates = {
  UP: {
    x: () => randomNumber(45, 55),
    y: () => 0
  },
  'UP-RIGHT': {
    x: () => 100,
    y: () => 100
  },
  RIGHT: {
    x: () => 100,
    y: () => randomNumber(45, 55)
  },
  'DOWN-RIGHT': {
    x: () => 100,
    y: () => 100
  },
  DOWN: {
    x: () => randomNumber(45, 55),
    y: () => 100
  },
  'DOWN-LEFT': {
    x: () => 0,
    y: () => 100
  },
  LEFT: {
    x: () => 0,
    y: () => randomNumber(45, 55)
  },
  'UP-LEFT': {
    x: () => 0,
    y: () => 0
  }
}

export default function Tickets({ direction, onDeflect }) {
  const [tickets, setTickets] = useState([])
  const [doneTickets, setDoneTickets] = useState([])

  function createTicket() {
    const target = randomItem(Object.keys(coordinates))
    const id = Date.now()

    return {
      id,
      target,
      x: coordinates[target].x(),
      y: coordinates[target].y(),
      timeout: randomNumber(1000, 2000),
      onTimeout: () => setDoneTickets(state => [...state, { id, target }])
      // onTimeout: () => setDoneTickets(state => [...state, `${id}_${target}])
    }
  }

  useEffect(() => {
    setInterval(() => {
      setTickets(state => [...state, createTicket()])
    }, 2000)
  }, [])

  useEffect(() => {
    console.log('...')
    if (doneTickets.length) {
      console.warn('XXX')
      // const foo =
      // setTickets(state =>
      //   state.filter(({ target, done }) => done && target !== direction)
      // )
      onDeflect(10)
    }
  }, [direction, doneTickets]) // eslint-disable-line

  // TODO: pause when switching tabs

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
          onAnimationEnd={ticket.onTimeout}
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
