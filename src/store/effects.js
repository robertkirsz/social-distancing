import { writable, derived } from 'svelte/store'

const { subscribe, update } = writable([])

const effects = {
  subscribe,
  activate(name, options = {}) {
    const id = Date.now()
    update(state => [...state, { id, name, ...options }])
    if (options.duration) setTimeout(() => effects.deactivate(id), options.duration)

    return id
  },
  deactivate(idOrName) {
    update(state => state.filter(item => ![item.id, item.name].includes(idOrName)))
  }
}

export default effects

export const isInvincible = derived(effects, $effects =>
  Boolean($effects.find(effect => effect.name === 'Invincibility'))
)
