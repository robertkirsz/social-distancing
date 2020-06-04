import { writable, get } from 'svelte/store'
import * as database from 'database'
import { descendingBy } from 'stuff'

const { subscribe, set } = writable([])

const players = {
  subscribe,
  find(id) {
    get(players).find(player => player.id === id)
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
    console.log('removeListener:')
    set([])
    database.removeListener('players', 'value')
  }
}

export default players
