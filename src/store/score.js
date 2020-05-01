import { writable } from 'svelte/store'

const { subscribe, set, update } = writable(0)

const score = {
  subscribe,
  set,
  update(value) {
    update(state => state + value)
    points.animate(Date.now(), value)
  }
}

export default score

const { subscribe: pointsSubscribe, update: pointsUpdate } = writable([])

export const points = {
  subscribe: pointsSubscribe,
  update: pointsUpdate,
  animate(id, value) {
    points.update(state => [...state, { id, value }])

    setTimeout(() => {
      points.update(state => state.filter(item => item.id !== id))
    }, 2000)
  }
}
