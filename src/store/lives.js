import { writable } from 'svelte/store'
import { INITIAL_LIVES } from 'stuff'
import { lifeUpSound, lifeDownSound } from 'sounds'

const { subscribe, set, update } = writable(INITIAL_LIVES)

export default {
  set,
  subscribe,
  update,
  add(amount = 1) {
    lifeUpSound.play()
    update(state => state + amount)
  },
  remove(amount = 1) {
    lifeDownSound.play()
    update(state => (state === 0 ? 0 : state - amount))
  }
}
