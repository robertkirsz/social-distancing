import { writable, get } from 'svelte/store'
import lives from 'store/lives'
import effects from 'store/effects'

const { subscribe, set } = writable(null)

const player = {
  subscribe,
  set,
  hit(amount) {
    if (get(lives) <= 0) return
    lives.update(state => state - amount)
    effects.activate('Invincibility', { duration: 1500 })
  }
}

export default player
