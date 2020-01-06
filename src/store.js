import { createStore, action, thunk } from 'easy-peasy'

import { coordinates, randomItem, randomNumber } from 'stuff'

// prettier-ignore
const getHandDirection = ({
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  lastPressedKey
}) =>
   ArrowUp && !ArrowRight && !ArrowDown && !ArrowLeft ? 'UP' :
   ArrowUp &&  ArrowRight && !ArrowDown && !ArrowLeft ? 'UP-RIGHT' :
  !ArrowUp &&  ArrowRight && !ArrowDown && !ArrowLeft ? 'RIGHT' :
  !ArrowUp &&  ArrowRight &&  ArrowDown && !ArrowLeft ? 'DOWN-RIGHT' :
  !ArrowUp && !ArrowRight &&  ArrowDown && !ArrowLeft ? 'DOWN' :
  !ArrowUp && !ArrowRight &&  ArrowDown &&  ArrowLeft ? 'DOWN-LEFT' :
  !ArrowUp && !ArrowRight && !ArrowDown &&  ArrowLeft ? 'LEFT' :
   ArrowUp && !ArrowRight && !ArrowDown &&  ArrowLeft ? 'UP-LEFT' :
  !ArrowUp && !ArrowRight && !ArrowDown && !ArrowLeft ? null :
  lastPressedKey

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
    direction: null,
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    lastPressedKey: null,
    lastPressedTime: 0,
    keydown: action((state, payload) => {
      state[payload] = true
      const direction = getHandDirection(state)
      state.direction = direction
      state.lastPressedKey = direction
      state.lastPressedTime = Date.now()
    }),
    keyup: action((state, payload) => {
      state[payload] = false
      state.direction = getHandDirection(state)
    }),
    riseHand: action((state, payload) => {
      state.direction = payload
      state.lastPressedTime = Date.now()
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
        const time = Date.now() - getStoreState().hand.lastPressedTime
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
    x: coordinates[target].x,
    y: coordinates[target].y,
    timeout: randomNumber(1000, 2000),
    land: () => store.getActions().tickets.land({ id, target })
  }
}

// prettier-ignore
function keyListener(method) {
  return function(event) {
    if (!['ArrowUp', 'ArrowRight', 'ArrowDown','ArrowLeft'].includes(event.key)) return
    if (method === 'keydown' && store.getState().hand[event.key] === true) return
    if (method === 'keyup' && store.getState().hand[event.key] === false) return
    event.preventDefault()
    store.getActions().hand[method](event.key)
  }
}

export function attachKeyboardListeners() {
  document.addEventListener('keydown', keyListener('keydown'))
  document.addEventListener('keyup', keyListener('keyup'))
}

export default store
