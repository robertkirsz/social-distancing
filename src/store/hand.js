import { writable } from 'svelte/store'
import { getHandDirection } from 'stuff'

const { subscribe, update } = writable({
  direction: null,
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
  lastPressedKey: null,
  lastPressedTime: 0
})

const hand = {
  subscribe,
  keydown(keyName) {
    update(state => {
      const updatedKeys = { ...state, [keyName]: true }

      return {
        ...updatedKeys,
        direction: getHandDirection(updatedKeys),
        lastPressedKey: keyName,
        lastPressedTime: Date.now()
      }
    })
  },
  keyup(keyName) {
    update(state => {
      const updatedKeys = { ...state, [keyName]: false }

      return {
        ...updatedKeys,
        direction: getHandDirection(updatedKeys)
      }
    })
  },
  riseHand(direction) {
    const newState = { direction }
    if (direction) newState.lastPressedTime = Date.now()
    update(state => ({ ...state, ...newState }))
  },
  reset() {
    update(state => ({
      ...state,
      direction: null,
      ArrowUp: false,
      ArrowRight: false,
      ArrowDown: false,
      ArrowLeft: false
    }))
  }
}

export default hand
