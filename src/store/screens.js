import { writable, get } from 'svelte/store'

const { subscribe, set, update } = writable(['HOW TO PLAY'])

const screens = {
  subscribe,
  open(name) {
    !get(screens).includes(name) && update(state => [...state, name])
  },
  close(names) {
    if (typeof names === 'string') {
      update(state => state.filter(item => item !== names))
    }

    if (Array.isArray(names)) {
      update(state => state.filter(item => !names.includes(item)))
    }
  },
  closeAll() {
    set([])
  },
  toggle(name) {
    get(screens).includes(name) ? screens.close(name) : screens.open(name)
  }
}

export default screens
