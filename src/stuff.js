export const INITIAL_LIVES = 3

export function randomItem (array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// prettier-ignore
export function getHandDirection ({ ArrowUp, ArrowRight, ArrowDown, ArrowLeft, lastPressedKey }) {
  return (
    ArrowUp && !ArrowRight && !ArrowDown && !ArrowLeft ? 'UP'
      : ArrowUp && ArrowRight && !ArrowDown && !ArrowLeft ? 'UP-RIGHT'
        : !ArrowUp && ArrowRight && !ArrowDown && !ArrowLeft ? 'RIGHT'
          : !ArrowUp && ArrowRight && ArrowDown && !ArrowLeft ? 'DOWN-RIGHT'
            : !ArrowUp && !ArrowRight && ArrowDown && !ArrowLeft ? 'DOWN'
              : !ArrowUp && !ArrowRight && ArrowDown && ArrowLeft ? 'DOWN-LEFT'
                : !ArrowUp && !ArrowRight && !ArrowDown && ArrowLeft ? 'LEFT'
                  : ArrowUp && !ArrowRight && !ArrowDown && ArrowLeft ? 'UP-LEFT'
                    : !ArrowUp && !ArrowRight && !ArrowDown && !ArrowLeft ? null
                      : lastPressedKey
  )
}

export const coordinates = {
  UP: { from: [0, -50], to: [0, -10] },
  'UP-RIGHT': { from: [50, -50], to: [10, -10] },
  RIGHT: { from: [50, 0], to: [10, 0] },
  'DOWN-RIGHT': { from: [50, 50], to: [10, 10] },
  DOWN: { from: [0, 50], to: [0, 10] },
  'DOWN-LEFT': { from: [-50, 50], to: [-10, 10] },
  LEFT: { from: [-50, 0], to: [-10, 0] },
  'UP-LEFT': { from: [-50, -50], to: [-10, -10] }
}

export const avatars = [
  '👩', '👩🏻', '👩🏼', '👩🏽', '👩🏾', '👩🏿',
  '🧑', '🧑🏻', '🧑🏼', '🧑🏽', '🧑🏾', '🧑🏿',
  '👨', '👨🏻', '👨🏼', '👨🏽', '👨🏾', '👨🏿'
]

export const getError = (id, error = {}) => ({
  id,
  code: error.code,
  message: error.response || error.request || error.message || error.config
})
