import { writable, get } from 'svelte/store'
import * as database from 'database'
import { descendingBy } from 'stuff'

const { subscribe, set } = writable([])

const players = {
  subscribe,
  find(id) {
    return get(players).find(player => player.id === id)
  },
  findRankingPlace(id) {
    return get(players).findIndex(player => player.id === id) + 1
  },
  addListener() {
    database.addValueListener('players', data => {
      const filteredData = Object.values(data)
        .filter(({ socialDistancingScore }) => socialDistancingScore !== undefined)
        .sort(descendingBy('socialDistancingScore'))

      set(filteredData)
    })
  },
  removeListener() {
    set([])
    database.removeListener('players', 'value')
  }
}

export default players
