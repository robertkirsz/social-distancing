import { writable, get } from 'svelte/store'

const { subscribe, set } = writable(null)

const player = {
  subscribe,
  set,
  getId() {
    return (get(player) || {}).id
  }
}

export default player
