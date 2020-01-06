import React from 'react'
import styled from 'styled-components'
import 'styled-components/macro'

import store from 'store'

const SIZE = 240
const UNIT = SIZE / 3

export default function TouchArea() {
  function handleTouch(event) {
    var rect = event.target.getBoundingClientRect()
    var x = Math.floor(event.touches[0].clientX - rect.left)
    var y = Math.floor(event.touches[0].clientY - rect.top)

    // prettier-ignore
    const direction =
      x > 0      && x < UNIT   && y > 0      && y < UNIT   ? 'UP-LEFT' :
      x > UNIT   && x < UNIT*2 && y > 0      && y < UNIT   ? 'UP' :
      x > UNIT*2 && x < UNIT*3 && y > 0      && y < UNIT   ? 'UP-RIGHT' :
      x > 0      && x < UNIT   && y > UNIT   && y < UNIT*2 ? 'LEFT' :
      x > UNIT*2 && x < UNIT*3 && y > UNIT   && y < UNIT*2 ? 'RIGHT' :
      x > 0      && x < UNIT   && y > UNIT*2 && y < UNIT*3 ? 'DOWN-LEFT' :
      x > UNIT   && x < UNIT*2 && y > UNIT*2 && y < UNIT*3 ? 'DOWN' :
      x > UNIT*2 && x < UNIT*3 && y > UNIT*2 && y < UNIT*3 ? 'DOWN-RIGHT' :
      null

    const alreadyUp = store.getState().hand.direction === direction
    if (!alreadyUp) store.getActions().hand.riseHand(direction)
  }

  function handleTouchEnd(event) {
    store.getActions().hand.riseHand(null)
  }

  return (
    <Wrapper
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
    />
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
`
