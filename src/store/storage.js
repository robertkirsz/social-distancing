import { writable, get } from 'svelte/store'

const { subscribe, update } = writable({
  signedIn: !!JSON.parse(localStorage.getItem('projectile-deflect_signedIn'))
})

const storage = {
  subscribe,
  save: (key, data) => {
    localStorage.setItem(`projectile-deflect_${key}`, JSON.stringify(data))
    update(state => ({ ...state, [key]: data }))
  },
  clear: () => {
    const localStorageKeys = Object.keys(get(storage))

    localStorageKeys.forEach(key => localStorage.removeItem(`projectile-deflect_${key}`))

    const keys = localStorageKeys.reduce((all, key) => ({ ...all, [key]: true }), {})

    update(state => ({ signedIn: keys.signedIn ? false : state.signedIn }))
  }
}

export default storage
