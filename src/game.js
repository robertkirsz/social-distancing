import { projectiles, gameIsRunning, gameIsWon, gameIsOver } from 'store'

let game

gameIsRunning.subscribe(isRunning => {
  if (isRunning) {
    if (!game) game = new Game()
    game.start()
  } else game && game.stop()
})

function Game() {
  const level = [
    { delay: 1000, type: 'Stranger', duration: 3000, direction: 'right' },
    { delay: 1000, type: 'Stranger', duration: 3000, direction: 'down' },
    { delay: 1000, type: 'Stranger', duration: 3000, direction: 'left' },
    { delay: 1000, type: 'Stranger', duration: 3000, direction: 'up' },
    { delay: 300, type: 'Friend', duration: 2000, direction: 'down-left' },
    { delay: 2000, type: 'Stranger', duration: 2000, direction: 'up' },
    { delay: 600, type: 'Stranger', duration: 2000, direction: 'up-right' },
    { delay: 600, type: 'Stranger', duration: 2000, direction: 'right' },
    { delay: 600, type: 'Stranger', duration: 2000, direction: 'down-right' },
    { delay: 600, type: 'Stranger', duration: 2000, direction: 'down' },
    { delay: 600, type: 'Stranger', duration: 2000, direction: 'down-left' },
    { delay: 600, type: 'Stranger', duration: 2000, direction: 'left' },
    { delay: 600, type: 'Stranger', duration: 2000, direction: 'up-left' },
    { delay: 600, type: 'Stranger', duration: 2000, direction: 'up' }
  ]

  function delayedThrow({ delay, ...projectile }) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!game) return resolve()
        console.log('throw:', projectile)
        projectiles.throw(projectile)
        resolve()
      }, delay)
    })
  }

  async function start() {
    console.log('start')
    if (!game) return
    for (const projectile of level) await delayedThrow(projectile)

    setTimeout(() => {
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
