export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// prettier-ignore
export const coordinates = {
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

export const keyToDirectionMap = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left'
}

// prettier-ignore
export const avatars = [
  '👩‍💻', '👩🏻‍💻', '👩🏼‍💻', '👩🏽‍💻', '👩🏾‍💻', '👩🏿‍💻',
  '🧑‍💻', '🧑🏻‍💻', '🧑🏼‍💻', '🧑🏽‍💻', '🧑🏾‍💻', '🧑🏿‍💻',
  '👨‍💻', '👨🏻‍💻', '👨🏼‍💻', '👨🏽‍💻', '👨🏾‍💻', '👨🏿‍💻',
]

export const hands = ['✋', '✋🏻', '✋🏼', '✋🏽', '✋🏾', '✋🏿']
