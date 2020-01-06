export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const coordinates = {
  UP: { x: 50, y: 0 },
  'UP-RIGHT': { x: 100, y: 0 },
  RIGHT: { x: 100, y: 50 },
  'DOWN-RIGHT': { x: 100, y: 100 },
  DOWN: { x: 50, y: 100 },
  'DOWN-LEFT': { x: 0, y: 100 },
  LEFT: { x: 0, y: 50 },
  'UP-LEFT': { x: 0, y: 0 }
}

// prettier-ignore
export const avatars = [
  '👩‍💻', '👩🏻‍💻', '👩🏼‍💻', '👩🏽‍💻', '👩🏾‍💻', '👩🏿‍💻',
  '🧑‍💻', '🧑🏻‍💻', '🧑🏼‍💻', '🧑🏽‍💻', '🧑🏾‍💻', '🧑🏿‍💻',
  '👨‍💻', '👨🏻‍💻', '👨🏼‍💻', '👨🏽‍💻', '👨🏾‍💻', '👨🏿‍💻',
]

export const hands = ['✋', '✋🏻', '✋🏼', '✋🏽', '✋🏾', '✋🏿']
