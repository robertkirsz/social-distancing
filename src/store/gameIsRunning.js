import { writable } from 'svelte/store'
import lives from 'store/lives'

const gameIsRunning = writable(false)

gameIsRunning.subscribe(isRunning => {
  if (isRunning) console.log('START!')
})

lives.subscribe(value => {
  if (value <= 0) {
    gameIsRunning.set(false)
  }
})

export default gameIsRunning
