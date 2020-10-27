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
  firstDelay = 1000,
  otherDelays = 1000,
  duration = 1500,
  numberOfFriends = 0,
  friendChance = 0.0,
  numberOfLives = 0,
  lifeChance = 0.0,
  numberOfShields = 0,
  shieldChance = 0.0
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

  return (clockwise ? directions : directions.reverse()).map((direction, index) => {
    const delay = index === 0 ? firstDelay : otherDelays

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
    { delay: 1200, type: 'Stranger', duration: 4500, direction: 'right' },
    { delay: 1200, type: 'Stranger', duration: 4500, direction: 'down' },
    { delay: 1200, type: 'Stranger', duration: 4500, direction: 'left' },
    { delay: 1200, type: 'Stranger', duration: 4500, direction: 'up' },
    { delay: 1200, type: 'Friend', duration: 4500, direction: 'down' },
    { delay: 4200, type: 'Stranger', duration: 3500, direction: 'up-right' },
    { delay: 1000, type: 'Stranger', duration: 3500, direction: 'down-right' },
    { delay: 1000, type: 'Stranger', duration: 3500, direction: 'down-left' },
    { delay: 1000, type: 'Stranger', duration: 3500, direction: 'up-left' },
    { delay: 1000, type: 'Shield', duration: 3500, direction: 'down' },
    ...randomize(6, {
      firstDelay: 3200,
      otherDelays: () => randomNumber(800, 900),
      duration: () => randomNumber(2000, 2100),
      numberOfFriends: 2,
      friendChance: 0.3
    }),
    ...circle({
      clockwise: true,
      firstDelay: 2000,
      otherDelays: () => randomNumber(550, 650),
      duration: () => randomNumber(1600, 1700),
      numberOfFriends: 1,
      friendChance: 0.2
    }),
    ...randomize(10, {
      firstDelay: 1700,
      otherDelays: () => randomNumber(500, 600),
      duration: () => randomNumber(1500, 1700),
      numberOfFriends: 2,
      friendChance: 0.3
    }),
    ...circle({
      start: 'down',
      clockwise: false,
      firstDelay: 1500,
      otherDelays: () => randomNumber(400, 500),
      duration: () => randomNumber(1100, 1200),
      numberOfFriends: 1,
      friendChance: 0.2
    }),
    ...randomize(10, {
      firstDelay: 1000,
      otherDelays: () => randomNumber(400, 500),
      duration: () => randomNumber(900, 1200),
      numberOfFriends: 1,
      friendChance: 0.2
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
