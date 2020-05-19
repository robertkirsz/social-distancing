import { writable, get } from 'svelte/store'
import screen from 'store/screen'
import score from 'store/score'
import player from 'store/player'
import * as database from 'database'

const gameIsOver = writable(false)

gameIsOver.subscribe(async isOver => {
  if (isOver) {
    screen.open('GAME OVER')

    const players = Object.values(await database.get('players'))
    const currentPlayerId = get(player).id
    const currentPlayer = players.find(({ id }) => id === currentPlayerId)
    const currentScore = currentPlayer.socialDistancingScore
    const newScore = get(score)
    const dataToUpdate = { socialDistancingTimesPlayed: (currentPlayer.socialDistancingTimesPlayed || 0) + 1 }

    if (currentScore === undefined || newScore > currentScore) dataToUpdate.socialDistancingScore = newScore

    database.update(`players/${currentPlayerId}`, dataToUpdate)
  }
})

export default gameIsOver
