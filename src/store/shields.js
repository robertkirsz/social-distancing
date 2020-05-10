import { v4 as uuidv4 } from 'uuid'
import { writable, derived } from 'svelte/store'
import { add, remove, randomItem } from 'stuff'

const { subscribe, update } = writable([])

function Shield({ id = uuidv4(), color = randomItem(['#A2F7B5', '#7CEAA7', '#5DDAA1', '#3FC9A2']) } = {}) {
  return { id, color }
}

const shields = {
  subscribe,
  create() {
    update(add(new Shield()))
  },
  destroy() {
    update(remove())
  }
}

export default shields

export const hasShield = derived(shields, $shields => $shields.length > 0)
