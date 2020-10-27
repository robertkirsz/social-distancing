import { projectiles, gameIsRunning, gameIsWon, gameIsOver } from 'store'
import { coordinates, randomItem, randomNumber, sleep } from 'stuff'

const debug = true
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
    delay = 1000,
    duration = 1500,
    directions = Object.keys(coordinates),
    nonRepeatingDirections = true,
    numberOfFriends = 2,
    friendChance = 0.25,
    numberOfLives = 1,
    lifeChance = 0.05,
    numberOfShields = 1,
    shieldChance = 0.1
  }
) {
  log('randomize')

  const friendMaker = new TypeGenerator('Friend', { amount: numberOfFriends, chance: friendChance })
  const shieldMaker = new TypeGenerator('Shield', { amount: numberOfShields, chance: shieldChance })
  const lifeMaker = new TypeGenerator('Life', { amount: numberOfLives, chance: lifeChance })

  return [...Array(amount)].reduce((acc, _, index) => {
    const previousElement = acc[index - 1] || {}

    let type = 'Stranger'
    type = friendMaker(type)
    type = shieldMaker(type)
    type = lifeMaker(type)

    let direction = randomItem(directions)
    if (nonRepeatingDirections) {
      while (direction === previousElement.direction) {
        direction = randomItem(directions)
      }
    }

    const item = {
      type,
      delay: typeof delay === 'function' ? delay() : delay,
      duration: typeof duration === 'function' ? duration() : duration,
      direction
    }

    log(item)

    return [...acc, item]
  }, [])
}

function circle({
  start = 'up',
  endAtStart = true,
  clockwise = true,
  delay = 1000,
  duration = 1500,
  numberOfFriends = 2,
  friendChance = 0.25,
  numberOfLives = 1,
  lifeChance = 0.05,
  numberOfShields = 1,
  shieldChance = 0.1
}) {
  log('circle')

  function shiftDirections(start, endAtStart) {
    const directions = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left']
    const index = directions.findIndex(direction => direction === start)
    const before = directions.slice(0, index)
    const after = directions.slice(index)
    const glued = [...after, ...before]

    return endAtStart ? [...glued, glued[0]] : glued
  }

  const directions = shiftDirections(start, endAtStart)
  const friendMaker = new TypeGenerator('Friend', { amount: numberOfFriends, chance: friendChance })
  const shieldMaker = new TypeGenerator('Shield', { amount: numberOfShields, chance: shieldChance })
  const lifeMaker = new TypeGenerator('Life', { amount: numberOfLives, chance: lifeChance })

  return (clockwise ? directions : directions.reverse()).map(direction => {
    let type = 'Stranger'
    type = friendMaker(type)
    type = shieldMaker(type)
    type = lifeMaker(type)

    const item = {
      type,
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
    { type: 'Stranger', duration: 4500, delay: 1200, direction: 'right' },
    { type: 'Stranger', duration: 4400, delay: 1200, direction: 'down' },
    { type: 'Stranger', duration: 4300, delay: 1200, direction: 'left' },
    { type: 'Stranger', duration: 4200, delay: 1200, direction: 'up' },
    { type: 'Friend', duration: 4100, delay: 1200, direction: 'down' },
    3000,
    { type: 'Stranger', duration: 4000, delay: 1100, direction: 'up-right' },
    { type: 'Stranger', duration: 4000, delay: 1000, direction: 'down-right' },
    { type: 'Stranger', duration: 4000, delay: 900, direction: 'down-left' },
    { type: 'Stranger', duration: 4000, delay: 800, direction: 'up-left' },
    { type: 'Shield', duration: 4000, delay: 700, direction: 'down' },
    3000,
    ...randomize(6, {
      delay: () => randomNumber(700, 1200),
      duration: () => randomNumber(1900, 2400)
    }),
    3000,
    ...circle({
      clockwise: true,
      delay: () => randomNumber(600, 700),
      duration: () => randomNumber(1600, 1700)
    }),
    3000,
    ...randomize(6, {
      delay: () => randomNumber(700, 1100),
      duration: () => randomNumber(1900, 2500)
    }),
    3000,
    { delay: 500, type: 'Stranger', duration: 1100, direction: 'left' },
    { delay: 500, type: 'Stranger', duration: 1100, direction: 'right' },
    3000,
    ...circle({
      start: 'down',
      clockwise: false,
      delay: () => randomNumber(600, 900),
      duration: () => randomNumber(1600, 2200)
    }),
    2000,
    ...randomize(8, {
      delay: () => randomNumber(500, 800),
      duration: () => randomNumber(1500, 2100)
    }),
    2000,
    { type: 'Stranger', duration: 1000, delay: 600, direction: 'up' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'down' },
    { type: 'Stranger', duration: 1000, delay: 400, direction: 'left' },
    { type: 'Stranger', duration: 1000, delay: 300, direction: 'right' },
    2000,
    ...randomize(10, {
      delay: () => randomNumber(400, 500),
      duration: () => randomNumber(900, 1200)
    }),
    2000,
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'up' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'down' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'left' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'right' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'up-right' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'down-left' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'up-left' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'down-right' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'left' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'right' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'down' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'up' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'down-right' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'up-right' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'up-left' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'down-left' }
  ]

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
