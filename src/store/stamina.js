import { writable, derived } from 'svelte/store'
import { MAX_STAMINA, clamp } from 'stuff'

const { subscribe, update, set } = writable(MAX_STAMINA)

const stamina = {
  subscribe,
  decrease(value = 1) {
    update(state => clamp(state - value, 0, MAX_STAMINA))
  },
  reset() {
    set(MAX_STAMINA)
  }
}

export default stamina

export const isExhausted = derived(stamina, $stamina => $stamina === 0)
