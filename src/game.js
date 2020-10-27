import { projectiles, gameIsRunning, gameIsWon, gameIsOver } from 'store'
import { coordinates, randomItem, randomNumber } from 'stuff'

const debug = false
const log = (...args) => debug && console.log(...args)

let game

gameIsRunning.subscribe(isRunning => {
  if (isRunning) {
    if (!game) game = new Game()
    game.start()
  } else game && game.stop()
})

function TypeGenerator(type, { amount, chance }, defaultType = 'Stranger') {
  this.amount = amount
  this.chance = chance

  return originalType => {
    if (this.chance > 0 && this.amount > 0 && originalType === defaultType && Math.random() < this.chance) {
      this.amount--
      return type
    }

    return originalType
  }
}

function randomize(
  amount,
  {
    type = 'Stranger',
    firstDelay = 1000,
    otherDelays = 1000,
    duration = 1500,
    directions = Object.keys(coordinates),
    nonRepeatingDirections = true,
    numberOfFriends = 0,
    friendChance = 0.0,
    numberOfLives = 0,
    lifeChance = 0.0,
    numberOfShields = 0,
    shieldChance = 0.0
  }
) {
  log('randomize')
  const friendMaker = new TypeGenerator('Friend', { amount: numberOfFriends, chance: friendChance })
  const shieldMaker = new TypeGenerator('Shield', { amount: numberOfShields, chance: shieldChance })
  const lifeMaker = new TypeGenerator('Life', { amount: numberOfLives, chance: lifeChance })

  return [...Array(amount)].reduce((acc, _, index) => {
    const previousElement = acc[index - 1] || {}
    const delay = index === 0 ? firstDelay : otherDelays

    let _type = type
    _type = friendMaker(_type)
    _type = shieldMaker(_type)
    _type = lifeMaker(_type)

    let direction = randomItem(directions)
    if (nonRepeatingDirections) {
      while (direction === previousElement.direction) {
        direction = randomItem(directions)
      }
    }

    const item = {
      type: _type,
      delay: typeof delay === 'function' ? delay() : delay,
      duration: typeof duration === 'function' ? duration() : duration,
      direction
    }

    log(item)

    return [...acc, item]
  }, [])
}

function circle({ clockwise = true, firstDelay = 1000, otherDelays = 1000, duration = 1500 }) {
  log('circle')
  const directions = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up']

  return (clockwise ? directions : directions.reverse()).map((direction, index) => {
    const delay = index === 0 ? firstDelay : otherDelays

    const item = {
      type: 'Stranger',
      delay: typeof delay === 'function' ? delay() : delay,
      duration: typeof duration === 'function' ? duration() : duration,
      direction
    }

    log(item)

    return item
  })
}

function Game() {
  const levels = [
    { delay: 1000, type: 'Stranger', duration: 4200, direction: 'right' },
    { delay: 1000, type: 'Stranger', duration: 4200, direction: 'down' },
    { delay: 1000, type: 'Stranger', duration: 4200, direction: 'left' },
    { delay: 1000, type: 'Stranger', duration: 4200, direction: 'up' },
    { delay: 1000, type: 'Friend', duration: 4200, direction: 'down' },
    { delay: 3000, type: 'Stranger', duration: 3200, direction: 'up-right' },
    { delay: 900, type: 'Stranger', duration: 3200, direction: 'down-right' },
    { delay: 900, type: 'Stranger', duration: 3200, direction: 'down-left' },
    { delay: 900, type: 'Stranger', duration: 3200, direction: 'up-left' },
    { delay: 900, type: 'Shield', duration: 3200, direction: 'down' },
    ...randomize(6, {
      firstDelay: 3000,
      otherDelays: () => randomNumber(800, 900),
      duration: () => randomNumber(2000, 2100),
      numberOfFriends: 2,
      friendChance: 0.3
    }),
    ...circle({ clockwise: true, firstDelay: 2000, otherDelays: 600, duration: 1700 }),
    ...randomize(10, {
      firstDelay: 1700,
      otherDelays: () => randomNumber(500, 600),
      duration: () => randomNumber(1500, 1700),
      numberOfFriends: 2,
      friendChance: 0.3
    }),
    ...circle({ clockwise: false, firstDelay: 1500, otherDelays: 500, duration: 1500 }),
    ...randomize(10, {
      firstDelay: 1000,
      otherDelays: () => randomNumber(400, 500),
      duration: () => randomNumber(900, 1200)
    })
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
