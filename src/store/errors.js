import { writable, get } from 'svelte/store'
import { getError } from 'stuff'

const { subscribe, update } = writable([])

const errors = {
  subscribe,
  show: (id, error) => {
    update(state => [...state.filter(item => item.id !== id), getError(id, error)])
  },
  hide: id => {
    if (!get(errors).find(item => item.id === id)) return
    update(state => (id ? state.filter(item => item.id !== id) : state.slice(1)))
  }
}

export default errors
