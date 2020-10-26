import { projectiles, gameIsRunning, gameIsWon, gameIsOver } from 'store'
import { coordinates, randomItem } from 'stuff'

let game

gameIsRunning.subscribe(isRunning => {
  if (isRunning) {
    if (!game) game = new Game()
    game.start()
  } else game && game.stop()
})

function randomize(
  amount,
  {
    type = 'Stranger',
    firstDelay = 1000,
    otherDelays = 1000,
    duration = 1500,
    directions = Object.keys(coordinates),
    nonRepeatingDirections = true
  }
) {
  return [...Array(amount)].reduce((acc, _, index) => {
    const previousElement = acc[index - 1] || {}
    const delay = index === 0 ? firstDelay : otherDelays
    let direction = randomItem(directions)

    if (nonRepeatingDirections) {
      while (direction === previousElement.direction) {
        direction = randomItem(directions)
      }
    }

    return [...acc, { delay, type, duration, direction }]
  }, [])
}

function Game() {
  // prettier-ignore
  const levels = [
    // Tutorial
    { delay: 1000, type: 'Stranger', duration: 4000, direction: 'right' },
    { delay: 1000, type: 'Stranger', duration: 4000, direction: 'down' },
    { delay: 1000, type: 'Stranger', duration: 4000, direction: 'left' },
    { delay: 1000, type: 'Stranger', duration: 4000, direction: 'up' },
    { delay: 1000, type: 'Friend',   duration: 4000, direction: 'down' },
    // Diagonals
    { delay: 4000, type: 'Stranger', duration: 3000, direction: 'up-right' },
    { delay: 900,  type: 'Stranger', duration: 3000, direction: 'down-right' },
    { delay: 900,  type: 'Stranger', duration: 3000, direction: 'down-left' },
    { delay: 900,  type: 'Stranger', duration: 3000, direction: 'up-left' },
    { delay: 900,  type: 'Shield',   duration: 3000, direction: 'down' },
    // Fun
    ...randomize(5, { firstDelay: 3000, otherDelays: 800, duration: 2000 }),
    // Circle
    { delay: 2000, type: 'Stranger', duration: 1700, direction: 'up' },
    { delay: 600,  type: 'Stranger', duration: 1700, direction: 'up-right' },
    { delay: 600,  type: 'Stranger', duration: 1700, direction: 'right' },
    { delay: 600,  type: 'Stranger', duration: 1700, direction: 'down-right' },
    { delay: 600,  type: 'Stranger', duration: 1700, direction: 'down' },
    { delay: 600,  type: 'Stranger', duration: 1700, direction: 'down-left' },
    { delay: 600,  type: 'Stranger', duration: 1700, direction: 'left' },
    { delay: 600,  type: 'Stranger', duration: 1700, direction: 'up-left' },
    { delay: 600,  type: 'Stranger', duration: 1700, direction: 'up' },
    // Fun!
    ...randomize(10, { firstDelay: 1700, otherDelays: 500, duration: 1500 }),
     // Counterclockwise circle
     { delay: 1500, type: 'Stranger', duration: 1000, direction: 'up' },
     { delay: 400,  type: 'Stranger', duration: 1000, direction: 'up-left' },
     { delay: 400,  type: 'Stranger', duration: 1000, direction: 'left' },
     { delay: 400,  type: 'Stranger', duration: 1000, direction: 'down-left' },
     { delay: 400,  type: 'Stranger', duration: 1000, direction: 'down' },
     { delay: 400,  type: 'Stranger', duration: 1000, direction: 'down-right' },
     { delay: 400,  type: 'Stranger', duration: 1000, direction: 'right' },
     { delay: 400,  type: 'Stranger', duration: 1000, direction: 'up-right' },
     { delay: 400,  type: 'Stranger', duration: 1000, direction: 'up' },
  ]

  const levelsWithIds = levels.map((projectile, index) => ({ id: index, ...projectile }))

  function delayedThrow({ delay, ...projectile }) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!game) return resolve()
        projectiles.throw(projectile)
        resolve()
      }, delay)
    })
  }

  async function start() {
    for (const projectile of levelsWithIds) {
      if (!game) break
      await delayedThrow(projectile)
    }

    setTimeout(() => {
      if (!game) return
      gameIsRunning.set(false)
      gameIsWon.set(true)
    }, 3000)
  }

  function stop() {
    projectiles.reset()
    gameIsOver.set(true)
    game = null
  }

  return { start, stop }
}
