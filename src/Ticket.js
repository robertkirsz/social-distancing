import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Ticket({ id, x, y, target, timeout, onTimeout }) {
  const [_x, setX] = useState(x)
  const [_y, setY] = useState(y)
  const [timer, setTimer] = useState(timeout)

  useEffect(() => {
    // console.log('MOUNTED', { id, target })
    setTimeout(() => {
      onTimeout(id, target)
    }, timeout)

    setTimeout(() => {
      setX(50)
      setY(50)
    })
  }, []) // eslint-disable-line

  useEffect(() => {
    let interval = null

    // interval = setInterval(() => {
    //   if (timer <= 0) {
    //     console.log('CLEAR!')
    //     clearInterval(interval)
    //     return
    //   }

    //   setTimer(state => state - 10)
    // }, 10)
  }, [timer])

  return (
    <Wrapper
      style={{
        top: `${_y}%`,
        left: `${_x}%`,
        transitionDuration: `${timeout}ms`,
        zIndex: id
      }}
    >
      <span>{target}</span>
      <span>{timer}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  position: absolute;

  background: pink;
  border-radius: 4px;

  text-align: center;
  font-size: 12px;

  transition-property: top, left;
  transform: translate(-50%, -50%);
`
