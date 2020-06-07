import { projectiles, gameIsRunning, gameIsOver } from 'store'

let game

gameIsRunning.subscribe(isRunning => {
  if (isRunning) {
    if (!game) game = new Game()
    game.start()
  } else game && game.stop()
})

function Game() {
  const level1 = [
    { delay: 1000, type: 'Stranger', duration: 3000, direction: 'right' },
    { delay: 1000, type: 'Stranger', duration: 3000, direction: 'down' },
    { delay: 1000, type: 'Stranger', duration: 3000, direction: 'left' },
    { delay: 1000, type: 'Stranger', duration: 3000, direction: 'up' }
  ]

  const level2 = [{ delay: 300, type: 'Friend', duration: 2000, direction: 'down-left' }]

  const level3 = [
    { delay: 2000, type: 'Stranger', duration: 2000, direction: 'up' },
    { delay: 400, type: 'Stranger', duration: 2000, direction: 'up-right' },
    { delay: 400, type: 'Stranger', duration: 2000, direction: 'right' },
    { delay: 400, type: 'Stranger', duration: 2000, direction: 'down-right' },
    { delay: 400, type: 'Stranger', duration: 2000, direction: 'down' },
    { delay: 400, type: 'Stranger', duration: 2000, direction: 'down-left' },
    { delay: 400, type: 'Stranger', duration: 2000, direction: 'left' },
    { delay: 400, type: 'Stranger', duration: 2000, direction: 'up-left' },
    { delay: 400, type: 'Stranger', duration: 2000, direction: 'up' }
  ]

  const levels = [level1, level2, level3]

  function playLevel(level) {
    console.log('playLevel:', level)
    return new Promise(async resolve => {
      for (const projectile of level) await delayedThrow(projectile)
      resolve()
    })
  }

  function delayedThrow({ delay, ...projectile }) {
    console.log('delayedThrow:', projectile)
    return new Promise(resolve => {
      setTimeout(() => {
        projectiles.throw(projectile)
        resolve()
      }, delay)
    })
  }

  async function start() {
    console.log('start')
    for (const level of levels) await playLevel(level)
    setTimeout(() => gameIsRunning.set(false), 3000)
  }

  function stop() {
    console.log('stop')
    projectiles.reset()
    gameIsOver.set(true)
  }

  return { start, stop }
}
