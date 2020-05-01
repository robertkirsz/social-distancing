import { writable } from 'svelte/store'

const { subscribe, set, update } = writable(0)

const score = {
  subscribe,
  set,
  update(value) {
    update(state => state + value)
  }
}

export default score

const { subscribe: scoreLabelsSubscribe, update: scoreLabelsUpdate } = writable([])

export const scoreLabels = {
  subscribe: scoreLabelsSubscribe,
  update: scoreLabelsUpdate,
  show(value, direction) {
    scoreLabels.update(state => [...state, { id: Date.now(), value, direction }])
  },
  hide(id) {
    scoreLabels.update(state => state.filter(item => item.id !== id))
  }
}
