import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

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
    x: () => randomNumber(25, 75),
    y: () => 0
  },
  'UP-RIGHT': {
    x: () => 100,
    y: () => 100
  },
  RIGHT: {
    x: () => 100,
    y: () => randomNumber(25, 75)
  },
  'DOWN-RIGHT': {
    x: () => 100,
    y: () => 100
  },
  DOWN: {
    x: () => randomNumber(25, 75),
    y: () => 100
  },
  'DOWN-LEFT': {
    x: () => 0,
    y: () => 100
  },
  LEFT: {
    x: () => 0,
    y: () => randomNumber(25, 75)
  },
  'UP-LEFT': {
    x: () => 0,
    y: () => 0
  }
}

export default function Tickets({ direction }) {
  const [tickets, setTickets] = useState([])

  function createTicket() {
    const target = randomItem(Object.keys(coordinates))

    return {
      id: Date.now(),
      target,
      x: coordinates[target].x(),
      y: coordinates[target].y(),
      timeout: randomNumber(1000, 2000)
    }
  }

  function handleTicketTimeout(id, target) {
    // console.log('HIT', { id, target }, direction)
    if (direction === target) {
      console.warn('WE GOT HIM!', id)
      setTickets(state => state.filter(ticket => ticket.id !== id))
    }
  }

  useEffect(() => {
    setInterval(() => {
      setTickets(state => [...state, createTicket()])
    }, 1500)
  }, [])

  return (
    <Wrapper>
      {tickets.map(ticket => (
        <Ticket key={ticket.id} {...ticket} onTimeout={handleTicketTimeout} />
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
