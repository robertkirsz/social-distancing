import { randomNumber, coordinates, randomItem } from 'stuff'

export default function Levels() {
  const debug = false
  const log = (...args) => debug && console.log(...args)

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
      lifeChance = 0.07,
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
    lifeChance = 0.07,
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

  return [
    { type: 'Stranger', duration: 4500, delay: 2000, direction: 'right' },
    { type: 'Stranger', duration: 4400, delay: 1200, direction: 'down' },
    { type: 'Stranger', duration: 4300, delay: 1200, direction: 'left' },
    { type: 'Stranger', duration: 4200, delay: 1200, direction: 'up' },
    { type: 'Friend', duration: 4100, delay: 1200, direction: 'down' },
    3000,
    { type: 'Stranger', duration: 4000, delay: 1100, direction: 'up-right' },
    { type: 'Stranger', duration: 4000, delay: 1000, direction: 'down-right' },
    { type: 'Stranger', duration: 4000, delay: 900, direction: 'down-left' },
    { type: 'Stranger', duration: 4000, delay: 800, direction: 'up-left' },
    { type: 'Shield', duration: 4000, delay: 900, direction: 'down' },
    3000,
    ...randomize(10, {
      delay: () => randomNumber(700, 1700),
      duration: () => randomNumber(2000, 4000)
    }),
    3000,
    { delay: 500, type: 'Stranger', duration: 1100, direction: 'down' },
    { delay: 500, type: 'Stranger', duration: 1100, direction: 'up' },
    3000,
    ...circle({
      delay: () => randomNumber(500, 1600),
      duration: () => randomNumber(1800, 2500)
    }),
    3000,
    { delay: 500, type: 'Stranger', duration: 1100, direction: 'left' },
    { delay: 500, type: 'Stranger', duration: 1100, direction: 'right' },
    3000,
    ...randomize(10, {
      delay: () => randomNumber(700, 1100),
      duration: () => randomNumber(1600, 2500)
    }),
    3000,
    ...circle({
      delay: () => randomNumber(200, 400),
      duration: () => randomNumber(1300, 1600)
    }),
    2000,
    { delay: 500, type: 'Stranger', duration: 1100, direction: 'down' },
    { delay: 200, type: 'Stranger', duration: 1100, direction: 'up' },
    { delay: 200, type: 'Friend', duration: 1100, direction: 'left' },
    2000,
    ...circle({
      start: 'down',
      clockwise: false,
      delay: () => randomNumber(400, 600),
      duration: () => randomNumber(1600, 2200)
    }),
    2000,
    ...randomize(10, {
      delay: () => randomNumber(500, 800),
      duration: () => randomNumber(1500, 2100)
    }),
    2000,
    ...circle({
      delay: () => randomNumber(500, 700),
      duration: () => randomNumber(1200, 2000)
    }),
    2000,
    { type: 'Stranger', duration: 1000, delay: 800, direction: 'up' },
    { type: 'Stranger', duration: 1000, delay: 700, direction: 'down' },
    { type: 'Stranger', duration: 1000, delay: 600, direction: 'left' },
    { type: 'Stranger', duration: 1000, delay: 500, direction: 'right' },
    2000,
    ...randomize(15, {
      delay: () => randomNumber(300, 1000),
      duration: () => randomNumber(900, 3500)
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
}
