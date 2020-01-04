import { createStore, action } from 'easy-peasy'

import { coordinates, randomItem, randomNumber } from 'stuff'

const store = createStore({
  game: {
    isLive: false,
    start: action((state, payload) => {
      state.isLive = true
    }),
    stop: action((state, payload) => {
      state.isLive = false
    })
  },
  score: {
    value: 0,
    update: action((state, payload) => {
      state.value += payload
    }),
    reset: action((state, payload) => {
      state.value = 0
    })
  },
  lives: {
    value: 5,
    update: action((state, payload) => {
      state.value += payload
    }),
    reset: action((state, payload) => {
      state.value = 5
    })
  },
  tickets: {
    flying: [],
    throw: action(state => {
      state.flying.push(createTicket())
    }),
    landed: [],
    land: action((state, payload) => {
      state.landed.push(payload)
    }),
    reset: action(state => {
      state.flying = []
      state.landed = []
    })
  }
})

function createTicket() {
  const target = randomItem(Object.keys(coordinates))
  const id = Date.now()

  return {
    id,
    target,
    x: coordinates[target].x(),
    y: coordinates[target].y(),
    timeout: randomNumber(1000, 2000),
    land: () => store.getActions().tickets.land({ id, target })
  }
}

export default store
