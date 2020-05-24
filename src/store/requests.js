import { writable, get } from 'svelte/store'

const { subscribe, update } = writable({
  authStateChange: !!JSON.parse(localStorage.getItem('signedIn')),
  signIn: false,
  signOut: false
})

const requests = {
  subscribe,
  start: name => {
    if (get(requests)[name]) return
    update(state => ({ ...state, [name]: true }))
  },
  stop: name => {
    if (!get(requests)[name]) return
    update(state => ({ ...state, [name]: false }))
  }
}

export default requests
