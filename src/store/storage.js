import { writable, get } from 'svelte/store'

const { subscribe, update } = writable({
  signedIn: !!JSON.parse(localStorage.getItem('signedIn'))
})

const storage = {
  subscribe,
  save: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
    update(state => ({ ...state, [key]: data }))
  },
  clear: () => {
    const localStorageKeys = Object.keys(get(storage))

    localStorageKeys.forEach(key => localStorage.removeItem(key))

    const keys = localStorageKeys.reduce((all, key) => ({ ...all, [key]: true }), {})

    update(state => ({ signedIn: keys.signedIn ? false : state.signedIn }))
  }
}

export default storage
