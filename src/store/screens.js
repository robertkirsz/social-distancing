import { writable, get } from 'svelte/store'

const { subscribe, set, update } = writable([])

const screens = {
  subscribe,
  open(name) {
    update(state => [...state, name])
  },
  close(name) {
    update(state => state.filter(item => item !== name))
  },
  closeAll() {
    set([])
  },
  toggle(name) {
    get(screens).includes(name) ? screens.close(name) : screens.open(name)
  }
}

export default screens
