import { writable, get } from 'svelte/store'
import screens from 'store/screens'
import score from 'store/score'
import { playerId } from 'store/player'
import lives from 'store/lives'
import players from 'store/players'
import * as database from 'database'
import { INITIAL_LIVES } from 'stuff'

const gameIsOver = writable()

gameIsOver.subscribe(async isOver => {
  const _playerId = get(playerId)

  if (isOver) {
    screens.open('GAME OVER')

    const currentPlayer = players.find(_playerId)
    const currentScore = currentPlayer.socialDistancingScore
    const newScore = get(score)
    const dataToUpdate = { socialDistancingTimesPlayed: (currentPlayer.socialDistancingTimesPlayed || 0) + 1 }

    if (currentScore === undefined || newScore > currentScore) dataToUpdate.socialDistancingScore = newScore

    database.update(`players/${_playerId}`, dataToUpdate)
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
