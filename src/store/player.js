import { writable, derived } from 'svelte/store'

const { subscribe, set } = writable(null)

const player = { subscribe, set }

export default player

export const playerId = derived(player, $player => ($player || {}).id)
