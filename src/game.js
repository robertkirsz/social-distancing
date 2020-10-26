import { projectiles, gameIsRunning, gameIsWon, gameIsOver } from 'store'

let game

gameIsRunning.subscribe(isRunning => {
  if (isRunning) {
    if (!game) game = new Game()
    game.start()
  } else game && game.stop()
})

function Game() {
  // prettier-ignore
  const level = [
    { id: 0,  delay: 1000, type: 'Stranger', duration: 3000, direction: 'right' },
    { id: 1,  delay: 1000, type: 'Stranger', duration: 3000, direction: 'down' },
    { id: 2,  delay: 1000, type: 'Stranger', duration: 3000, direction: 'left' },
    { id: 3,  delay: 1000, type: 'Stranger', duration: 3000, direction: 'up' },
    { id: 4,  delay: 500,  type: 'Friend',   duration: 2000, direction: 'down-left' },
    { id: 5,  delay: 2000, type: 'Stranger', duration: 2000, direction: 'up' },
    { id: 6,  delay: 600,  type: 'Stranger', duration: 2000, direction: 'up-right' },
    { id: 7,  delay: 600,  type: 'Stranger', duration: 2000, direction: 'right' },
    { id: 8,  delay: 600,  type: 'Stranger', duration: 2000, direction: 'down-right' },
    { id: 9,  delay: 600,  type: 'Stranger', duration: 2000, direction: 'down' },
    { id: 10, delay: 600,  type: 'Stranger', duration: 2000, direction: 'down-left' },
    { id: 11, delay: 600,  type: 'Stranger', duration: 2000, direction: 'left' },
    { id: 12, delay: 600,  type: 'Stranger', duration: 2000, direction: 'up-left' },
    { id: 13, delay: 600,  type: 'Stranger', duration: 2000, direction: 'up' }
  ]

  function delayedThrow({ delay, ...projectile }) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!game) return resolve()
        console.log(projectile)
        projectiles.throw(projectile)
        resolve()
      }, delay)
    })
  }

  // TODO: remove logs

  async function start() {
    console.log('start')
    for (const projectile of level) {
      if (!game) break
      await delayedThrow(projectile)
    }

    setTimeout(() => {
      if (!game) return
      console.log('won')
      gameIsRunning.set(false)
      gameIsWon.set(true)
    }, 3000)
  }

  function stop() {
    console.log('stop')
    projectiles.reset()
    gameIsOver.set(true)
    game = null
  }

  return { start, stop }
}
