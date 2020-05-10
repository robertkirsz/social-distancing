import { onDestroy } from 'svelte'
export const INITIAL_LIVES = 3

export const MAX_STAMINA = 12

export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function range(value, min, max) {
  return value * (max - min) + min
}

export function loopThrough(items) {
  let index = 0

  return function next() {
    if (index === items.length) index = 0
    return items[index++]
  }
}

export function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num
}

export function onInterval(callback, milliseconds) {
  const interval = setInterval(callback, milliseconds)

  onDestroy(() => {
    clearInterval(interval)
  })
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

export const getTirednessLevel = value => (value <= 20 ? 2 : value <= 50 ? 1 : 0)

export const tirednessEffects = [
  { color: 'gold', cooldown: 500 },
  { color: 'orange', cooldown: 1000 },
  { color: 'red', cooldown: 1500 }
]

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
  Life: {
    emoji: '💖',
    onHit: { type: 'Add life', amount: 1 },
    onDeflect: () => ({ type: 'Hit heart', points: randomNumber(250, 300) })
  },
  Shield: {
    emoji: '🛡',
    onHit: { type: 'Add shield' },
    onDeflect: () => ({ type: 'Hit shield', points: randomNumber(150, 200) })
  },
  Stranger: {
    emoji: duration => (duration <= 2500 ? randomItem(runners) : randomItem(walkers)),
    onHit: { type: 'Remove life', amount: 1 },
    onDeflect: duration => ({
      type: 'Hit stranger',
      points: duration <= 2500 ? randomNumber(150, 220) : randomNumber(80, 150)
    })
  },
  Friend: {
    emoji: () => randomItem(friends),
    onHit: { type: 'Hug friend', points: 300 },
    onDeflect: { type: 'Hit friend', points: -1000 }
  }
}

export const add = item => state => [...state, item]

export const remove = id => state => (id === undefined ? state.slice(0, -1) : state.filter(item => item.id !== id))

export const tween = (min, max, progress, inverse) => (inverse ? Math.abs(1 - progress) : progress) * (max - min) + min
