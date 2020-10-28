import { projectiles, gameIsRunning, gameIsWon, gameIsOver } from 'store'
import { sleep } from 'stuff'
import Levels from 'levels'

let game

gameIsRunning.subscribe(isRunning => {
  if (isRunning) {
    if (!game) game = new Game()
    game.start()
  } else game && game.stop()
})

function Game() {
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
    const levels = new Levels()

    for (const projectile of levels) {
      if (!game) break
      await (typeof projectile === 'number' ? sleep(projectile) : delayedThrow(projectile))
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
