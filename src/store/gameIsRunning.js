import { writable } from 'svelte/store'

const gameIsRunning = writable(false)

gameIsRunning.subscribe(isRunning => {
  if (isRunning) console.log('START!')
})

export default gameIsRunning
