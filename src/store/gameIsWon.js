import { writable, get } from 'svelte/store'
import * as database from 'database'
import { playerId } from 'store/player'
import players from 'store/players'

const gameIsWon = writable(false)

gameIsWon.subscribe(isWon => {
  if (isWon) {
    const _playerId = get(playerId)
    const currentPlayer = players.find(_playerId)
    const dataToUpdate = { timesWon: (currentPlayer.timesWon || 0) + 1 }
    database.update(`__baseUrl__/players/${_playerId}`, dataToUpdate)
  }
})

export default gameIsWon
