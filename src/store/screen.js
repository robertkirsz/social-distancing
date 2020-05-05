import { writable } from 'svelte/store'

const { subscribe, set, update } = writable(null)

export default {
  subscribe,
  open(name) {
    set(name)
  },
  close() {
    set(null)
  },
  toggle(name) {
    update(state => (state === name ? null : name))
  }
}
