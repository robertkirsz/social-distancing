import { writable } from 'svelte/store'

const { subscribe, set } = writable(null)

export default { subscribe, set }
