import { writable, get } from 'svelte/store'

export const getError = (id = Date.now(), error = {}) => ({
  id,
  code: error.code || '',
  message: error.response || error.request || error.message || error.config || ''
})

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
