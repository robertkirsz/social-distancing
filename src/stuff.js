export const INITIAL_LIVES = 5

export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// prettier-ignore
export function getHandDirection({ ArrowUp, ArrowRight, ArrowDown, ArrowLeft, lastPressedKey }) {
  return (
     ArrowUp && !ArrowRight && !ArrowDown && !ArrowLeft ? 'UP' :
     ArrowUp &&  ArrowRight && !ArrowDown && !ArrowLeft ? 'UP-RIGHT' :
    !ArrowUp &&  ArrowRight && !ArrowDown && !ArrowLeft ? 'RIGHT' :
    !ArrowUp &&  ArrowRight &&  ArrowDown && !ArrowLeft ? 'DOWN-RIGHT' :
    !ArrowUp && !ArrowRight &&  ArrowDown && !ArrowLeft ? 'DOWN' :
    !ArrowUp && !ArrowRight &&  ArrowDown &&  ArrowLeft ? 'DOWN-LEFT' :
    !ArrowUp && !ArrowRight && !ArrowDown &&  ArrowLeft ? 'LEFT' :
     ArrowUp && !ArrowRight && !ArrowDown &&  ArrowLeft ? 'UP-LEFT' :
    !ArrowUp && !ArrowRight && !ArrowDown && !ArrowLeft ? null :
    lastPressedKey
  )
}

export const coordinates = {
  UP: { x: 0, y: -300 },
  'UP-RIGHT': { x: 300, y: -300 },
  RIGHT: { x: 300, y: 0 },
  'DOWN-RIGHT': { x: 300, y: 300 },
  DOWN: { x: 0, y: 300 },
  'DOWN-LEFT': { x: -300, y: 300 },
  LEFT: { x: -300, y: 0 },
  'UP-LEFT': { x: -300, y: -300 }
}

// prettier-ignore
export const avatars = [
  '👩','👩🏻','👩🏼','👩🏽','👩🏾','👩🏿',
  '🧑','🧑🏻','🧑🏼','🧑🏽','🧑🏾','🧑🏿',
  '👨','👨🏻','👨🏼','👨🏽','👨🏾','👨🏿',
]

export const getError = (id, error = {}) => ({
  id,
  code: error.code,
  message: error.response || error.request || error.message || error.config
})
