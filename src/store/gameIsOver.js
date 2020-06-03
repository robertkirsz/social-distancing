import { writable, get } from 'svelte/store'
import screens from 'store/screens'
import score from 'store/score'
import player from 'store/player'
import lives from 'store/lives'
import * as database from 'database'
import { INITIAL_LIVES } from 'stuff'

const gameIsOver = writable()

gameIsOver.subscribe(async isOver => {
  if (isOver) {
    screens.open('GAME OVER')

    const players = Object.values(await database.get('players'))
    const currentPlayerId = get(player).id
    const currentPlayer = players.find(({ id }) => id === currentPlayerId)
    const currentScore = currentPlayer.socialDistancingScore
    const newScore = get(score)
    const dataToUpdate = { socialDistancingTimesPlayed: (currentPlayer.socialDistancingTimesPlayed || 0) + 1 }

    if (currentScore === undefined || newScore > currentScore) dataToUpdate.socialDistancingScore = newScore

    database.update(`players/${currentPlayerId}`, dataToUpdate)
  } else if (isOver === false) {
    lives.set(INITIAL_LIVES)
    score.set(0)
    screens.close('GAME OVER')
  }
})

lives.subscribe(value => {
  if (value <= 0) gameIsOver.set(true)
})

export default gameIsOver
