import { createStore, action, thunk, actionOn, computed } from 'easy-peasy'

import { coordinates, randomItem, randomNumber, keyToDirectionMap } from 'stuff'

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
  hand: {
    up: false,
    right: false,
    down: false,
    left: false,
    last: null,
    time: 0,
    putUp: action((state, payload) => {
      state[payload] = true
    }),
    onPutUp: actionOn(
      actions => actions.putUp,
      (state, target) => {
        state.last = target.payload
        state.time = Date.now()
      }
    ),
    putDown: action((state, payload) => {
      state[payload] = false
    }),
    direction: computed(({ up, right, down, left, last }) => {
      if (up && !right && !down && !left) return 'UP'
      if (up && right && !down && !left) return 'UP-RIGHT'
      if (!up && right && !down && !left) return 'RIGHT'
      if (!up && right && down && !left) return 'DOWN-RIGHT'
      if (!up && !right && down && !left) return 'DOWN'
      if (!up && !right && down && left) return 'DOWN-LEFT'
      if (!up && !right && !down && left) return 'LEFT'
      if (up && !right && !down && left) return 'UP-LEFT'
      if (!up && !right && !down && !left) return null
      return last
    })
  },
  tickets: {
    items: [],
    throw: action(state => {
      state.items.push(createTicket())
    }),
    remove: action((state, payload) => {
      state.items = state.items.filter(ticket => ticket.id !== payload)
    }),
    land: thunk((actions, payload, { getStoreState, getStoreActions }) => {
      if (payload.target === getStoreState().hand.direction) {
        const time = Date.now() - getStoreState().hand.time
        getStoreActions().score.update(time < 300 ? 25 : 10)
      } else {
        getStoreActions().lives.update(-1)
      }

      actions.remove(payload.id)
    }),
    reset: action(state => {
      state.items = []
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

export function attachKeyboardListeners() {
  document.addEventListener('keydown', event => {
    const currentDirection = keyToDirectionMap[event.key]
    const alreadyUp = store.getState().hand[currentDirection] === true

    if (!currentDirection || alreadyUp) return

    event.preventDefault()
    store.getActions().hand.putUp(currentDirection)
  })

  document.addEventListener('keyup', event => {
    const currentDirection = keyToDirectionMap[event.key]
    const alreadyDown = store.getState().hand[currentDirection] === false

    if (!currentDirection || alreadyDown) return

    event.preventDefault()
    store.getActions().hand.putDown(currentDirection)
  })
}

export default store
