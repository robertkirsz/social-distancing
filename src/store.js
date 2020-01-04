import { createStore, action } from 'easy-peasy'

export default createStore({
  score: {
    value: 0,
    update: action((state, payload) => {
      state.value += payload
    })
  },
  lives: {
    value: 5,
    update: action((state, payload) => {
      state.value += payload
    })
  },
  tickets: {
    landed: [],
    land: action((state, payload) => {
      state.landed.push(payload)
    })
  }
})
