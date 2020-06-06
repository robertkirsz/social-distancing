import { writable, derived, get } from 'svelte/store'
import * as database from 'database'
import { descendingBy } from 'stuff'
import player from 'store/player'

const { subscribe, set } = writable([])

const players = {
  subscribe,
  find: id => get(players).find(player => player.id === id),
  addListener() {
    database.addValueListener('players', data => {
      set(Object.values(data).sort(descendingBy('socialDistancingScore')))
    })
  },
  removeListener() {
    set([])
    database.removeListener('players', 'value')
  }
}

export default players

export const socialDistancingPlayers = derived(players, $players =>
  $players.filter(({ socialDistancingScore }) => socialDistancingScore !== undefined)
)

export const currentRank = derived(
  [socialDistancingPlayers, player],
  ([$socialDistancingPlayers, $player]) =>
    $socialDistancingPlayers.findIndex(player => player.id === ($player || {}).id) + 1
)
