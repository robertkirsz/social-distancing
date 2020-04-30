import { writable } from 'svelte/store'

const appIsReady = writable(true) // TODO: false

export default appIsReady
