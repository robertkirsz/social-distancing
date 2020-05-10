import { v4 as uuidv4 } from 'uuid'
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
  show(value, direction = 'up') {
    scoreLabels.update(state => [...state, { id: uuidv4(), value, direction }])
  },
  hide(id) {
    scoreLabels.update(state => state.filter(item => item.id !== id))
  }
}
