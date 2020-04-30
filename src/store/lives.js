import { writable } from 'svelte/store'
import { INITIAL_LIVES } from 'stuff'
import gameIsRunning from 'store/gameIsRunning'
import gameIsOver from 'store/gameIsOver'

const lives = writable(INITIAL_LIVES)

lives.subscribe(value => {
  if (value <= 0) {
    gameIsRunning.set(false)
    gameIsOver.set(true)
  }
})

export default lives
