export const INITIAL_LIVES = 3

export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// prettier-ignore
export function getHandDirection({ ArrowUp, ArrowRight, ArrowDown, ArrowLeft, lastPressedKey }) {
  return (
     ArrowUp && !ArrowRight && !ArrowDown && !ArrowLeft ? 'up'
  :  ArrowUp &&  ArrowRight && !ArrowDown && !ArrowLeft ? 'up-right'
  : !ArrowUp &&  ArrowRight && !ArrowDown && !ArrowLeft ? 'right'
  : !ArrowUp &&  ArrowRight &&  ArrowDown && !ArrowLeft ? 'down-right'
  : !ArrowUp && !ArrowRight &&  ArrowDown && !ArrowLeft ? 'down'
  : !ArrowUp && !ArrowRight &&  ArrowDown &&  ArrowLeft ? 'down-left'
  : !ArrowUp && !ArrowRight && !ArrowDown &&  ArrowLeft ? 'left'
  :  ArrowUp && !ArrowRight && !ArrowDown &&  ArrowLeft ? 'up-left'
  : !ArrowUp && !ArrowRight && !ArrowDown && !ArrowLeft ? null
  : lastPressedKey
  )
}

export const coordinates = {
  up: { from: [0, -50], to: [0, -10] },
  'up-right': { from: [50, -50], to: [10, -10] },
  right: { from: [50, 0], to: [10, 0] },
  'down-right': { from: [50, 50], to: [10, 10] },
  down: { from: [0, 50], to: [0, 10] },
  'down-left': { from: [-50, 50], to: [-10, 10] },
  left: { from: [-50, 0], to: [-10, 0] },
  'up-left': { from: [-50, -50], to: [-10, -10] }
}

// prettier-ignore
// TODO: not used
export const avatars = [
  '👩','👩🏻','👩🏼','👩🏽','👩🏾','👩🏿',
  '🧑','🧑🏻','🧑🏼','🧑🏽','🧑🏾','🧑🏿',
  '👨','👨🏻','👨🏼','👨🏽','👨🏾','👨🏿'
]

// prettier-ignore
export const walkers = [
  '🚶','🚶🏻','🚶🏼','🚶🏽','🚶🏾','🚶🏿',
  '🚶‍♂️','🚶🏻‍♂️','🚶🏼‍♂️','🚶🏽‍♂️','🚶🏾‍♂️','🚶🏿‍♂️',
  '🚶‍♀️','🚶🏻‍♀️','🚶🏼‍♀️','🚶🏽‍♀️','🚶🏾‍♀️','🚶🏿‍♀️',
]

// prettier-ignore
export const runners = [
  '🏃','🏃🏻','🏃🏼','🏃🏽','🏃🏾','🏃🏿',
  '🏃‍♂️','🏃🏻‍♂️','🏃🏼‍♂️','🏃🏽‍♂️','🏃🏾‍♂️','🏃🏿‍♂️',
  '🏃‍♀️','🏃🏻‍♀️','🏃🏼‍♀️','🏃🏽‍♀️','🏃🏾‍♀️','🏃🏿‍♀️',
]

export const friends = ['👩‍❤️‍👨', '👩‍❤️‍👩', '👨‍❤️‍👨']

export const projectileTypes = {
  Life: { emoji: '💖', onHit: { type: 'Add life', amount: 1 }, onDeflect: {} },
  Shield: { emoji: '🛡', onHit: { type: 'Add shield' }, onDeflect: {} },
  Stranger: {
    emoji: duration => (duration <= 1500 ? randomItem(runners) : randomItem(walkers)),
    onHit: { type: 'Remove life', amount: 1 },
    onDeflect: { type: 'Hit stranger', points: 10 }
  },
  Friend: {
    emoji: () => randomItem(friends),
    onHit: { type: 'Hug friend', points: 20 },
    onDeflect: { type: 'Hit friend', points: -20 }
  }
}

export const getError = (id, error = {}) => ({
  id,
  code: error.code,
  message: error.response || error.request || error.message || error.config
})

export const add = item => state => [...state, item]

export const remove = id => state => (id === undefined ? state.slice(0, -1) : state.filter(item => item.id !== id))

export const tween = (min, max, progress, inverse) => (inverse ? Math.abs(1 - progress) : progress) * (max - min) + min
