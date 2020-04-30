import { writable } from 'svelte/store'

const { subscribe, set, update } = writable(null)

const screen = {
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

export default screen
