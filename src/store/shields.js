import { v4 as uuidv4 } from 'uuid'
import { writable, derived } from 'svelte/store'
import { add, randomItem, SHIELD_DURATION } from 'stuff'
import { addShieldSound, removeShieldSound } from 'sounds'

const { subscribe, update } = writable([])

function Shield({ id = uuidv4(), color = randomItem(['#A2F7B5', '#7CEAA7', '#5DDAA1', '#3FC9A2']) } = {}) {
  return { id, color }
}

const shields = {
  subscribe,
  create() {
    const shield = new Shield()
    update(add(shield))
    addShieldSound.play()
    setTimeout(() => shields.destroy(shield.id), SHIELD_DURATION)
  },
  destroy(id) {
    update(state => {
      if (id === undefined) {
        removeShieldSound.play()
        return state.slice(0, -1)
      }

      if (!state.find(item => item.id === id)) {
        return state
      }

      removeShieldSound.play()
      return state.filter(item => item.id !== id)
    })
  }
}

export default shields

export const hasShield = derived(shields, $shields => $shields.length > 0)
